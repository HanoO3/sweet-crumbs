import { useEffect, useState } from 'react';
import API from '../../api/axios';
import { useToast } from '../../context/ToastContext';
import { getImageUrl, handleImageError } from '../../utils/imageUtils';
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
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const isEdit = !!editingId;
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append('image', imageFile);

    const req = isEdit
      ? API.put(`/products/${editingId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      : !imageFile
        ? Promise.reject(new Error('Please select a product image'))
        : API.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } });

    req
      .then(() => {
        showToast(isEdit ? 'Product updated successfully! ✏️' : 'Product added successfully! 🧁', 'success');
        resetForm();
        fetchProducts();
      })
      .catch((err) => {
        const msg = err.response?.data?.message || err.message || 'Something went wrong';
        setError(msg);
        showToast(msg, 'error');
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
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
    setImagePreview(p.image ? getImageUrl(p.image) : null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this delicacy?')) return;
    API.delete(`/products/${id}`)
      .then(() => {
        showToast('Product deleted successfully! 🗑️', 'info');
        fetchProducts();
      })
      .catch((err) => {
        const msg = err.response?.data?.message || 'Could not delete product';
        showToast(msg, 'error');
      });
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Form Card */}
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h3>{editingId ? '✏️ Edit Bakery Item' : '➕ Add New Bakery Item'}</h3>
          {editingId && <span className={styles.editingBadge}>Editing Mode</span>}
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>Item Name</label>
              <input
                name="name"
                placeholder="e.g. Strawberry Glazed Donut"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Price (Rs.)</label>
              <input
                name="price"
                type="number"
                placeholder="150"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Available Stock</label>
              <input
                name="stock"
                type="number"
                placeholder="25"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe taste, ingredients, and texture..."
              value={form.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className={styles.imageUploadRow}>
            <div className={styles.fileInputBox}>
              <label>Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {imagePreview && (
              <div className={styles.previewBox}>
                <img src={imagePreview} alt="Preview" className={styles.previewImg} />
                <span>Image Preview</span>
              </div>
            )}

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
              />
              ⭐ Mark as Bestseller / Featured Item
            </label>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitBtn} disabled={saving}>
              {saving ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
            </button>
            {editingId && (
              <button type="button" className={styles.cancelBtn} onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.tableTopRow}>
          <div>
            <h3>All Products ({products.length})</h3>
            <p>Manage pricing, inventory stock levels, and store visibility.</p>
          </div>

          <input
            type="text"
            placeholder="🔍 Search items..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className={styles.tableSearch}
          />
        </div>

        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name & Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={getImageUrl(p.image)}
                      alt={p.name}
                      className={styles.thumb}
                      onError={(e) => handleImageError(e)}
                    />
                  </td>
                  <td>
                    <div className={styles.itemNameMeta}>
                      <strong>{p.name}</strong>
                      <span className={styles.itemDescSnippet}>{p.description}</span>
                    </div>
                  </td>
                  <td>
                    <span className={styles.catBadge}>{p.category?.name || 'Uncategorized'}</span>
                  </td>
                  <td><strong className={styles.priceText}>Rs. {p.price}</strong></td>
                  <td>
                    {p.stock === 0 ? (
                      <span className={styles.outStockBadge}>Sold Out</span>
                    ) : p.stock <= 5 ? (
                      <span className={styles.lowStockBadge}>Low ({p.stock})</span>
                    ) : (
                      <span className={styles.inStockBadge}>{p.stock} Available</span>
                    )}
                  </td>
                  <td>{p.isFeatured ? <span className={styles.starBadge}>⭐ Featured</span> : <span className={styles.normalBadge}>Standard</span>}</td>
                  <td>
                    <div className={styles.actionBtnsGroup}>
                      <button className={styles.editBtn} onClick={() => handleEdit(p)}>
                        Edit
                      </button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(p._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}