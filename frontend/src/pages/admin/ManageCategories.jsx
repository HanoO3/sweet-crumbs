import { useEffect, useState } from 'react';
import API from '../../api/axios';
import styles from './ManageCategories.module.css';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const fetchCategories = () => {
    API.get('/categories').then((res) => setCategories(res.data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await API.put(`/categories/${editingId}`, { name });
      } else {
        await API.post('/categories', { name });
      }
      setName('');
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setName(cat.name);
  };

  const handleCancel = () => {
    setEditingId(null);
    setName('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await API.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || 'Could not delete');
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Manage Categories</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Category</button>
        {editingId && (
          <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.name}</td>
              <td>{cat.slug}</td>
              <td>
                <button className={styles.editBtn} onClick={() => handleEdit(cat)}>
                  Edit
                </button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(cat._id)}>
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