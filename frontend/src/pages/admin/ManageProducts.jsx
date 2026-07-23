import { useEffect, useState } from 'react';
import API from '../../api/axios';
import styles from './ManageProducts.module.css';

const emptyForm = {
  name: '',
  description: '',
  price: '',
  category: '',
  stock: '',
  isFeatured: false,
};

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchProducts = () => {
    API.get('/products').then((res) => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
    API.get('/categories').then((res) => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append('image', imageFile);

    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        if (!imageFile) {
          setError('Please select an image');
          setSaving(false);
          return;
        }
        await API.post('/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category?._id || '',
      stock: p.stock,
      isFeatured: p.isFeatured,
    });
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete');
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Manage Products</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <input
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          required
        />

        <div className={styles.row}>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange}
            />
            Featured
          </label>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
          </button>
          {editingId && (
            <button type="button" className={styles.cancelBtn} onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                <img
                  src={`http://localhost:5000${p.image}`}
                  alt={p.name}
                  className={styles.thumb}
                />
              </td>
              <td>{p.name}</td>
              <td>{p.category?.name || '-'}</td>
              <td>Rs. {p.price}</td>
              <td>{p.stock}</td>
              <td>{p.isFeatured ? 'Yes' : 'No'}</td>
              <td>
                <button className={styles.editBtn} onClick={() => handleEdit(p)}>
                  Edit
                </button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(p._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}