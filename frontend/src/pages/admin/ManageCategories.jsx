import { useEffect, useState } from 'react';
import API from '../../api/axios';
import { useToast } from '../../context/ToastContext';
import styles from './ManageCategories.module.css';

export default function ManageCategories() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (err) {
      showToast('Failed to load categories', 'error');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const isEdit = !!editingId;

    try {
      if (isEdit) {
        await API.put(`/categories/${editingId}`, { name });
        showToast('Category updated successfully! 🏷️', 'success');
      } else {
        await API.post('/categories', { name });
        showToast('Category created successfully! 🏷️', 'success');
      }
      setName('');
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      setError(msg);
      showToast(msg, 'error');
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
    if (!window.confirm('Delete this category? Products in this category will be uncategorized.')) return;
    try {
      await API.delete(`/categories/${id}`);
      showToast('Category deleted successfully! 🗑️', 'info');
      fetchCategories();
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not delete category';
      showToast(msg, 'error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {/* Form Card */}
        <div className={styles.formCard}>
          <h3>{editingId ? '✏️ Edit Category' : '🏷️ Create New Category'}</h3>
          <p className={styles.formSubtitle}>
            Categories help customers filter pastries and desserts on the menu.
          </p>

          {error && <div className={styles.errorBox}>{error}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Category Name</label>
              <input
                type="text"
                placeholder="e.g. Fluffy Cupcakes, Donut Rings"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.submitBtn}>
                {editingId ? 'Update Category' : 'Add Category'}
              </button>
              {editingId && (
                <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Table Card */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h3>All Categories ({categories.length})</h3>
            <p>Active product groupings for store navigation.</p>
          </div>

          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>URL Slug</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat._id}>
                    <td>
                      <strong className={styles.catTitle}>{cat.name}</strong>
                    </td>
                    <td>
                      <code className={styles.slugTag}>/{cat.slug}</code>
                    </td>
                    <td>
                      <div className={styles.actionsGroup}>
                        <button className={styles.editBtn} onClick={() => handleEdit(cat)}>
                          Edit
                        </button>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(cat._id)}>
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
    </div>
  );
}