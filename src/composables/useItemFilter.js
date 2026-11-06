/* Composable: useItemFilter
   Combines search query + category filter simultaneously.
   Usage:
     const { filtered, query, activeCategory, setSearch, setCategory, reset } = useItemFilter(items);
*/
import { computed, ref } from 'vue';

export function useItemFilter(sourceItems, initialCategory = 'All') {
  const query = ref('');
  const activeCategory = ref(initialCategory);

  const filtered = computed(() => {
    const q = query.value.trim().toLowerCase();
    const cat = activeCategory.value;

    return sourceItems.value.filter((item) => {
      const matchCategory = cat === 'All' || item.category === cat;
      if (!q) return matchCategory;

      const haystack = [
        item.title,
        item.summary,
        item.description,
        item.category,
        ...(item.highlights || []),
      ]
        .join(' ')
        .toLowerCase();

      return matchCategory && haystack.includes(q);
    });
  });

  function setSearch(value) {
    query.value = value;
  }

  function setCategory(value) {
    activeCategory.value = value;
  }

  function reset() {
    query.value = '';
    activeCategory.value = 'All';
  }

  return {
    filtered,
    query,
    activeCategory,
    setSearch,
    setCategory,
    reset,
  };
}
