<template>
  <div class="dashboard-container">
    <OwnerSidebar />

    <!-- Middle Content -->
    <div class="container my-4 main-content">
      <div class="d-flex justify-content-between align-items-center">
        <h4>Product Control Dashboard</h4>
        <div class="d-flex align-items-center">
          <!-- Add Product Button -->
          <button @click="showAddProductModal" class="btn btn-success">Add Product</button>
        </div>
      </div>

      <!-- Product Control Content -->
      <div class="mb-5">
        <h5>Product Inventory</h5>
        <div class="product-inventory">
          <div class="d-flex justify-content-between align-items-center">
            <!-- Sort and Filter Dropdowns -->
            <div class="dropdown ms-2">
                <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="sortDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                >
                Sort By
                </button>
                <div class="dropdown-menu p-2" aria-labelledby="sortDropdown">
                <!-- Sort Options -->
                <div class="form-check">
                    <input
                    class="form-check-input"
                    type="radio"
                    name="sortOption"
                    id="sortByIdAsc"
                    @change="sortTable('id')"
                    checked
                    />
                    <label class="form-check-label" for="sortByIdAsc">
                    ID
                    </label>
                </div>

                <div class="form-check">
                    <input
                    class="form-check-input"
                    type="radio"
                    name="sortOption"
                    id="sortByNameAsc"
                    @change="sortTable('name')"
                    />
                    <label class="form-check-label" for="sortByNameAsc">
                    Name
                    </label>
                </div>

                <div class="form-check">
                    <input
                    class="form-check-input"
                    type="radio"
                    name="sortOption"
                    id="sortByPriceAsc"
                    @change="sortTable('price')"
                    />
                    <label class="form-check-label" for="sortByPriceAsc">
                    Price
                    </label>
                </div>

                <div class="form-check">
                    <input
                    class="form-check-input"
                    type="radio"
                    name="sortOption"
                    id="sortByQuantityAsc"
                    @change="sortTable('quantity')"
                    />
                    <label class="form-check-label" for="sortByQuantityAsc">
                    Quantity
                    </label>
                </div>

                <!-- Divider Line -->
                <div class="dropdown-divider"></div>

                <!-- Ascending or Descending Order -->
                <div class="form-check">
                    <input
                    class="form-check-input"
                    type="radio"
                    name="sortOrder"
                    id="ascOrder"
                    @change="sortTable(sortBy)"
                    checked
                    />
                    <label class="form-check-label" for="ascOrder">
                    Asc
                    </label>
                </div>

                <div class="form-check">
                    <input
                    class="form-check-input"
                    type="radio"
                    name="sortOrder"
                    id="descOrder"
                    @change="sortTable(sortBy, 'desc')"
                    />
                    <label class="form-check-label" for="descOrder">
                    Desc
                    </label>
                </div>
                </div>
            </div>

            <!-- Search Button -->
            <button class="btn btn-primary ms-2" @click="toggleSearch">Search</button>

            <!-- Search Input (Hidden by default) -->
            <input
              type="text"
              v-if="showSearch"
              v-model="search"
              @input="filterProducts"
              placeholder="Search by Name or ID"
              class="form-control ms-2"
            />
          </div>

          <!-- Product Table -->
          <table class="table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in filteredProductInventory" :key="book.id">
                <td>{{ book.id }}</td>
                <td>{{ book.name }}</td>
                <td>${{ book.price }}</td>
                <td>{{ book.quantity }}</td>
                <td>{{ book.category }}</td>
                <td>
                  <button @click="editBook(book)" class="btn btn-primary mr-2">Edit</button>
                  <button @click="deleteBook(book.id)" class="btn btn-danger me-2">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Right Content -->
    <div class="container my-4 right-content">
      <!-- Number of Products Card -->
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">Number of Products</h5>
          <p class="card-text">{{ productInventory.length }}</p>
        </div>
      </div>

      <!-- Low Stock Products Card -->
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">Low Stock Products</h5>
          <p class="card-text">{{ lowStockProducts.length }}</p>
        </div>
      </div>

      <!-- Out of Stock Products Card -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Out of Stock Products</h5>
          <p class="card-text">{{ outOfStockProducts.length }}</p>
        </div>
      </div>
    </div>

    <!-- Add/Edit Book Form Modal -->
    <div v-if="showModal" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editMode ? 'Edit Book' : 'Add Book' }}</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editMode ? updateBook() : addBook()">
              <div class="mb-3">
                <label for="productName" class="form-label">Book Name</label>
                <input type="text" v-model="newProduct.name" class="form-control" id="productName" required>
              </div>
              <div class="mb-3">
                <label for="productPrice" class="form-label">Price</label>
                <input type="number" v-model="newProduct.price" class="form-control" id="productPrice" required>
              </div>
              <div class="mb-3">
                <label for="productQuantity" class="form-label">Quantity</label>
                <input type="number" v-model="newProduct.quantity" class="form-control" id="productQuantity" required>
              </div>
              <div class="mb-3">
                <label for="bookCategory" class="form-label">Category</label>
                <input type="text" v-model="newProduct.category" class="form-control" id="bookCategory" required>
              </div>
              <button type="submit" class="btn btn-primary">{{ editMode ? 'Update Book' : 'Add Book' }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import OwnerSidebar from "../components/owner-sidebar.vue";
import _ from "lodash";

export default {
  data() {
    return {
      productInventory: [
        { id: 1, name: 'Product A', price: 50, quantity: 100, category: 'Fiction' },
        { id: 2, name: 'Product B', price: 30, quantity: 50, category: 'Mystery' },
        { id: 3, name: 'Product C', price: 25, quantity: 75, category: 'Science Fiction' },
        { id: 4, name: 'Product D', price: 40, quantity: 120, category: 'Romance' },
        { id: 5, name: 'Product E', price: 60, quantity: 90, category: 'Fantasy' },
        { id: 6, name: 'Product F', price: 35, quantity: 60, category: 'Thriller' },
        { id: 7, name: 'Product G', price: 45, quantity: 80, category: 'Non-Fiction' },
        { id: 8, name: 'Product H', price: 55, quantity: 110, category: 'Biography' },
        { id: 9, name: 'Product I', price: 28, quantity: 5, category: 'Historical Fiction' },
        { id: 10, name: 'Product J', price: 75, quantity: 0, category: 'Self-Help' },
      ],
      showModal: false,
      sortedProductInventory: [],
      sortBy: 'id',
      sortOrder: 'asc',
      search: '',
      showSearch: false,
      newProduct: {
        name: '',
        price: null,
        quantity: null,
        category: '',
      },
      editMode: false,
      selectedBook: null,
    };
  },
  components: {
    OwnerSidebar
  },
  computed: {
    filteredProductInventory() {
      const search = this.search.toLowerCase();
      return this.sortedProductInventory.filter(book =>
        book.name.toLowerCase().includes(search) || String(book.id).includes(search)
      );
    },
    lowStockProducts() {
      return this.productInventory.filter(book => book.quantity > 0 && book.quantity <= 10);
    },
    outOfStockProducts() {
      return this.productInventory.filter(book => book.quantity === 0);
    },
  },
  methods: {
    showAddProductModal() {
      this.newProduct = { name: '', price: null, quantity: null, category: '' };
      this.showModal = true;
      this.editMode = false;
      this.selectedBook = null;
    },
    closeModal() {
      this.showModal = false;
    },
    addBook() {
      this.productInventory.push({
        id: this.productInventory.length + 1,
        name: this.newProduct.name,
        price: this.newProduct.price,
        quantity: this.newProduct.quantity,
        category: this.newProduct.category,
      });
      this.closeModal();
    },
    editBook(book) {
      this.showAddProductModal();
      this.editMode = true;
      this.selectedBook = book;
      this.newProduct = { ...book };
    },
    updateBook() {
      const index = this.productInventory.findIndex(book => book.id === this.selectedBook.id);
      if (index !== -1) {
        this.$set(this.productInventory, index, { ...this.newProduct });
      }
      this.closeModal();
    },
    sortTable(field, order = 'asc') {
      this.sortBy = field;
      this.sortOrder = order;
      this.sortedProductInventory = this.sortProductInventory();
    },
    sortProductInventory() {
      return _.orderBy(this.productInventory, this.sortBy, this.sortOrder);
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
      if (!this.showSearch) {
        this.search = '';
        this.filterProducts();
      }
    },
    filterProducts() {
      this.sortedProductInventory = this.sortProductInventory();
    },
    deleteBook(bookId) {
      const index = this.productInventory.findIndex(book => book.id === bookId);
      if (index !== -1) {
        this.productInventory.splice(index, 1);
      }
    },
  },
  watch: {
    productInventory: {
      handler() {
        this.sortedProductInventory = this.sortProductInventory();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  height: fit-content;
  background-color: #f4efe9;
}

.main-content {
  padding: 20px;
}

.product-inventory {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
}

.product-inventory table {
  width: 100%;
}

.product-inventory table th,
.product-inventory table td {
  padding: 12px;
  text-align: left;
  cursor: pointer;
}

.add-product {
  margin-top: 20px;
}

.right-content {
  padding: 20px;
}

.card {
  width: 18rem;
  height: 13rem;
  align-items: center;
}

.card-text {
  font-size: 72px;
  text-align: center;
}

</style>
