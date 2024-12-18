document.addEventListener("DOMContentLoaded", () => {
  // Sidebar Toggle untuk Mobile
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.querySelector("aside");
  sidebarToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // Mencegah event bubbling
    sidebar.classList.toggle("hidden");
  });

  // Logout Button
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", () => {
    showToast("Info", "Logged out successfully", "info");
    // Redirect ke halaman login atau handle logout
  });

  // Toast Function
  function showToast(title, message, type) {
    const toastContainer = document.getElementById("toast-container");
    const toast = document.createElement("div");
    let icon;
    let bgColor;

    switch (type) {
      case "success":
        icon = `<svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                   </svg>`;
        bgColor = "bg-white";
        break;
      case "destructive":
        icon = `<svg class="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                   </svg>`;
        bgColor = "bg-white";
        break;
      case "info":
        icon = `<svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                   </svg>`;
        bgColor = "bg-white";
        break;
      default:
        icon = "";
        bgColor = "bg-white";
    }

    toast.className = `max-w-xs w-full ${bgColor} shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`;

    toast.innerHTML = `
              <div class="flex-1 w-0 p-4">
                  <div class="flex items-start">
                      <div class="flex-shrink-0 pt-0.5">
                          ${icon}
                      </div>
                      <div class="ml-3 flex-1">
                          <p class="text-sm font-medium text-gray-900">${title}</p>
                          <p class="mt-1 text-sm text-gray-500">${message}</p>
                      </div>
                  </div>
              </div>
              <div class="flex border-l border-gray-200">
                  <button class="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-500 focus:outline-none">
                      &times;
                  </button>
              </div>
          `;

    // Close Toast
    toast.querySelector("button").addEventListener("click", () => {
      toast.remove();
    });

    toastContainer.appendChild(toast);

    // Automatically remove toast after 5 seconds
    setTimeout(() => {
      toast.remove();
    }, 5000);
  }

  // Sample Menu Items
  const menuItems = [
    {
      id: 1,
      name: "Nasi Goreng Spesial",
      description: "Nasi goreng dengan ayam, telur, dan sayuran segar",
      price: 25000,
      image: "https://via.placeholder.com/300x200.png?text=Nasi+Goreng+Spesial",
      category: "Food",
    },
    {
      id: 2,
      name: "Ayam Bakar",
      description: "Ayam bakar bumbu rempah khas",
      price: 30000,
      image: "https://via.placeholder.com/300x200.png?text=Ayam+Bakar",
      category: "Food",
    },
    {
      id: 3,
      name: "Es Teh Manis",
      description: "Es teh manis segar tanpa pemanis buatan",
      price: 8000,
      image: "https://via.placeholder.com/300x200.png?text=Es+Teh+Manis",
      category: "Beverages",
    },
    {
      id: 4,
      name: "Jus Alpukat",
      description: "Jus alpukat segar tanpa gula tambahan",
      price: 12000,
      image: "https://via.placeholder.com/300x200.png?text=Jus+Alpukat",
      category: "Beverages",
    },
    {
      id: 5,
      name: "Pisang Goreng",
      description: "Pisang goreng renyah dengan gula kelapa",
      price: 10000,
      image: "https://via.placeholder.com/300x200.png?text=Pisang+Goreng",
      category: "Dessert",
    },
    {
      id: 6,
      name: "Kue Lumpur",
      description: "Kue lumpur lembut dengan topping meses",
      price: 9000,
      image: "https://via.placeholder.com/300x200.png?text=Kue+Lumpur",
      category: "Dessert",
    },
    // Tambahkan item menu lainnya sesuai kebutuhan
  ];

  // Render Menu Items
  const menuGrid = document.getElementById("menu-grid");
  function renderMenuItems(items) {
    menuGrid.innerHTML = "";
    if (items.length === 0) {
      menuGrid.innerHTML = '<p class="text-gray-500">No menu items found.</p>';
      return;
    }
    items.forEach((item) => {
      const menuItem = document.createElement("div");
      menuItem.className = "bg-white rounded-lg shadow-sm overflow-hidden";
      menuItem.innerHTML = `
                  <div class="relative">
                      <img src="${item.image}" alt="${
        item.name
      }" class="w-full h-48 object-cover" />
                      <span class="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                          ${item.category}
                      </span>
                  </div>
                  <div class="p-4">
                      <h3 class="font-semibold text-lg">${item.name}</h3>
                      <p class="text-gray-500 text-sm mt-1">${
                        item.description
                      }</p>
                      <div class="flex items-center justify-between mt-4">
                          <span class="text-blue-600 font-medium">
                              Rp ${item.price.toLocaleString()}
                          </span>
                          <button class="text-gray-400 hover:text-gray-600 add-to-order-button" data-id="${
                            item.id
                          }" title="Add to Order">
                              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M12 4v16m8-8H4" />
                              </svg>
                          </button>
                      </div>
                  </div>
              `;
      menuGrid.appendChild(menuItem);
    });

    // Add Event Listeners to "Add" Buttons
    const addButtons = document.querySelectorAll(".add-to-order-button");
    addButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = parseInt(button.getAttribute("data-id"));
        const item = menuItems.find((menuItem) => menuItem.id === itemId);
        if (item) {
          addToOrder(item);
        }
      });
    });
  }

  // Initial Render
  renderMenuItems(menuItems);

  // Category Filtering
  const categoryButtons = document.querySelectorAll(
    ".flex.space-x-4.mb-6 button"
  );
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active classes
      categoryButtons.forEach((btn) => {
        btn.classList.remove("bg-blue-600", "text-white");
        btn.classList.add(
          "bg-white",
          "text-gray-600",
          "border",
          "border-gray-300"
        );
      });
      // Add active classes to clicked button
      button.classList.remove(
        "bg-white",
        "text-gray-600",
        "border",
        "border-gray-300"
      );
      button.classList.add("bg-blue-600", "text-white");

      const selectedCategory = button.textContent.trim();
      if (selectedCategory === "All Menu") {
        renderMenuItems(menuItems);
      } else {
        const category = selectedCategory.replace(/s$/i, ""); // Menghilangkan 's' di akhir kata
        const filteredItems = menuItems.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );
        renderMenuItems(filteredItems);
      }
    });
  });

  // Search Functionality
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const filteredItems = menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
    renderMenuItems(filteredItems);
  });

  // Populate Table Numbers
  const tableNumberSelect = document.getElementById("table-number");
  for (let i = 1; i <= 20; i++) {
    const option = document.createElement("option");
    option.value = String(i);
    option.textContent = `Table ${i}`;
    tableNumberSelect.appendChild(option);
  }

  // Handle Order Form
  const dineInButton = document.getElementById("dine-in-button");
  const takeAwayButton = document.getElementById("take-away-button");
  const customerNameInput = document.getElementById("customer-name");
  const tableNumberInput = document.getElementById("table-number");
  const payButton = document.getElementById("pay-button");
  const orderList = document.getElementById("order-list");
  const tableNumberContainer = document.getElementById(
    "table-number-container"
  );

  // Data Structure for Orders
  let orders = {};

  dineInButton.addEventListener("click", () => {
    dineInButton.classList.add("bg-blue-600", "text-white");
    dineInButton.classList.remove("bg-gray-200", "text-gray-600");
    takeAwayButton.classList.add("bg-gray-200", "text-gray-600");
    takeAwayButton.classList.remove("bg-blue-600", "text-white");

    // Show No.Table field
    tableNumberContainer.classList.remove("hidden");
  });

  takeAwayButton.addEventListener("click", () => {
    takeAwayButton.classList.add("bg-blue-600", "text-white");
    takeAwayButton.classList.remove("bg-gray-200", "text-gray-600");
    dineInButton.classList.add("bg-gray-200", "text-gray-600");
    dineInButton.classList.remove("bg-blue-600", "text-white");

    // Hide No.Table field
    tableNumberContainer.classList.add("hidden");
  });

  // Add to Order Function
  function addToOrder(item) {
    if (orders[item.id]) {
      orders[item.id].quantity += 1;
    } else {
      orders[item.id] = {
        ...item,
        quantity: 1,
        note: "", // Tambahkan properti note
      };
    }
    renderOrderList();
    updatePayButton();
    // Hapus toast saat menambahkan item
    // showToast('Success', `${item.name} added to order`, 'success');
  }

  // Render Order List
  // Render Order List
  function renderOrderList() {
    if (Object.keys(orders).length === 0) {
      orderList.innerHTML = "No Menu Selected";
      document.getElementById("subtotal-price").textContent = "Rp 0";
      document.getElementById("tax-amount").textContent = "Rp 0";
      document.getElementById("total-price").textContent = "Rp 0";
      return;
    }

    let html = "";
    let subtotal = 0;

    for (const key in orders) {
      const order = orders[key];
      const itemTotal = order.price * order.quantity;
      subtotal += itemTotal;

      html += `
            <div class="flex justify-between items-center mb-4" data-id="${
              order.id
            }">
                <div class="flex-1">
                    <h3 class="font-semibold">${order.name}</h3>
                    ${
                      order.note
                        ? `<p class="text-sm text-gray-500 italic">${order.note}</p>`
                        : ""
                    }
                    <div class="flex items-center text-gray-500 text-sm">
                        <span>Rp ${order.price.toLocaleString()}</span>
                        <button class="edit-note-button ml-2" title="Edit Note">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="decrement-button px-2 py-1 bg-gray-200 rounded">-</button>
                    <span class="text-gray-700">${order.quantity}</span>
                    <button class="increment-button px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
            </div>
        `;
    }

    // Calculate tax and total
    const tax = Math.round(subtotal * 0.1); // 10% tax
    const total = subtotal + tax;

    orderList.innerHTML = html;
    document.getElementById(
      "subtotal-price"
    ).textContent = `Rp ${subtotal.toLocaleString()}`;
    document.getElementById(
      "tax-amount"
    ).textContent = `Rp ${tax.toLocaleString()}`;
    document.getElementById(
      "total-price"
    ).textContent = `Rp ${total.toLocaleString()}`;

    // Add Event Listeners for Increment and Decrement Buttons
    const incrementButtons = document.querySelectorAll(".increment-button");
    const decrementButtons = document.querySelectorAll(".decrement-button");
    const editNoteButtons = document.querySelectorAll(".edit-note-button");

    incrementButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const orderDiv = button.closest("div[data-id]");
        const orderId = parseInt(orderDiv.getAttribute("data-id"));
        if (orders[orderId]) {
          orders[orderId].quantity += 1;
          renderOrderList();
          updatePayButton();
        }
      });
    });

    decrementButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const orderDiv = button.closest("div[data-id]");
        const orderId = parseInt(orderDiv.getAttribute("data-id"));
        if (orders[orderId]) {
          orders[orderId].quantity -= 1;
          if (orders[orderId].quantity <= 0) {
            delete orders[orderId];
          }
          renderOrderList();
          updatePayButton();
        }
      });
    });

    // Add Event Listeners for Edit Note Buttons
    editNoteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const orderDiv = button.closest("div[data-id]");
        const orderId = parseInt(orderDiv.getAttribute("data-id"));
        openEditNoteModal(orderId);
      });
    });
  }

  // Update Pay Button Appearance
  function updatePayButton() {
    if (Object.keys(orders).length > 0) {
      payButton.classList.remove("bg-gray-200", "text-gray-600");
      payButton.classList.add("bg-blue-600", "text-white");
    } else {
      payButton.classList.remove("bg-blue-600", "text-white");
      payButton.classList.add("bg-gray-200", "text-gray-600");
    }
  }

  // Add Event Listeners to Sidebar Menu Items
  const sidebarMenuButtons = document.querySelectorAll("aside nav a");
  sidebarMenuButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const title = button.getAttribute("title");
      showToast("Info", `${title} page is under construction`, "info");
    });
  });

  // Sidebar Responsive Toggle (Click outside to close)
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.add("hidden");
    }
  });
  const nominalButtons = document.querySelectorAll(".nominal-btn");
  const customNominalInput = document.getElementById("custom-nominal");

  nominalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nominal = button.textContent.replace(/[^\d]/g, ""); // Ambil angka saja
      customNominalInput.value = nominal;
    });
  });

  // Edit Note Modal Elements
  const editNoteModal = document.getElementById("edit-note-modal");
  const closeEditNoteModal = document.getElementById("close-edit-note-modal");
  const submitEditNoteButton = document.getElementById("submit-edit-note");
  const editNoteInput = document.getElementById("edit-note-input");

  let currentEditingOrderId = null;

  const editNoteTitle = document.getElementById("edit-note-title"); // Element judul modal
  const editNoteDescription = document.getElementById("edit-note-description"); // Tambahan deskripsi

  const editNoteImage = document.getElementById("edit-note-image"); // Gambar produk
  const editNotePrice = document.getElementById("edit-note-price"); // Harga produk

  function openEditNoteModal(orderId) {
    currentEditingOrderId = orderId;
    const currentOrder = orders[orderId];

    // Isi data di modal edit
    editNoteTitle.textContent = currentOrder.name; // Nama produk
    editNoteDescription.textContent = currentOrder.description; // Deskripsi produk
    editNotePrice.textContent = `Rp ${currentOrder.price.toLocaleString()}`; // Harga produk
    editNoteImage.src = currentOrder.image; // Gambar produk
    editNoteInput.value = currentOrder.note || ""; // Note sebelumnya
    editNoteModal.classList.remove("hidden");
  }

  // Event listener untuk close edit note modal
  closeEditNoteModal.addEventListener("click", () => {
    editNoteModal.classList.add("hidden");
    currentEditingOrderId = null;
  });

  // Submit edit note
  submitEditNoteButton.addEventListener("click", () => {
    if (currentEditingOrderId !== null) {
      const newNote = editNoteInput.value.trim();
      orders[currentEditingOrderId].note = newNote;
      renderOrderList();
      updatePayButton();
      showToast(
        "Success",
        `Note for "${orders[currentEditingOrderId].name}" updated`,
        "success"
      );
      editNoteModal.classList.add("hidden");
      currentEditingOrderId = null;
    }
  });

  // Close edit note modal when clicking outside
  editNoteModal.addEventListener("click", (e) => {
    if (e.target === editNoteModal) {
      editNoteModal.classList.add("hidden");
      currentEditingOrderId = null;
    }
  });

  // Update payButton click handler
  payButton.addEventListener("click", () => {
    const customerName = customerNameInput.value.trim();
    const tableNumber = tableNumberInput.value.trim();
    const receivedAmount =
      parseInt(document.getElementById("custom-nominal").value) || 0;

    // Calculate total
    let subtotal = 0;
    for (const key in orders) {
      subtotal += orders[key].price * orders[key].quantity;
    }
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + tax;

    // Validations
    if (
      !customerName ||
      (dineInButton.classList.contains("bg-blue-600") && !tableNumber)
    ) {
      showToast(
        "Error",
        "Please fill in customer name and table number",
        "destructive"
      );
      return;
    }

    if (Object.keys(orders).length === 0) {
      showToast("Error", "No items in the order", "destructive");
      return;
    }

    if (receivedAmount < total) {
      showToast("Error", "Received amount is less than total", "destructive");
      return;
    }

    // Show success modal
    showSuccessModal(receivedAmount);
  });

  function showSuccessModal(receivedAmount) {
    const modal = document.getElementById("success-modal");
    const subtotal = Object.values(orders).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + tax;
    const change = receivedAmount - total;

    // Generate order number and date
    const orderNumber = "ORD#" + Date.now().toString().slice(-8);
    const orderDate = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());

    // Update receipt content
    document.getElementById("receipt-order-number").textContent = orderNumber;
    document.getElementById("receipt-date").textContent = orderDate;
    document.getElementById("receipt-customer").textContent =
      customerNameInput.value;
    document.getElementById("receipt-type").textContent =
      dineInButton.classList.contains("bg-blue-600") ? "Dine In" : "Take Away";

    // Update items
    const receiptItems = document.getElementById("receipt-items");
    receiptItems.innerHTML = Object.values(orders)
      .map(
        (item) => `
                  <div class="flex justify-between mb-2">
                      <span>${item.quantity} x ${item.name}${
          item.note ? ` - <em>${item.note}</em>` : ""
        }</span>
                      <span>Rp ${(
                        item.price * item.quantity
                      ).toLocaleString()}</span>
                  </div>
              `
      )
      .join("");

    // Update totals
    document.getElementById(
      "receipt-subtotal"
    ).textContent = `Rp ${subtotal.toLocaleString()}`;
    document.getElementById(
      "receipt-tax"
    ).textContent = `Rp ${tax.toLocaleString()}`;
    document.getElementById(
      "receipt-total"
    ).textContent = `Rp ${total.toLocaleString()}`;
    document.getElementById(
      "receipt-received"
    ).textContent = `Rp ${receivedAmount.toLocaleString()}`;
    document.getElementById(
      "receipt-change"
    ).textContent = `Rp ${change.toLocaleString()}`;

    // Show modal
    modal.classList.remove("hidden");

    // Add close handlers
    const closeBtn = document.getElementById("close-modal");
    const printBtn = document.getElementById("print-struk");

    function closeModal() {
      modal.classList.add("hidden");
      // Reset form
      customerNameInput.value = "";
      tableNumberInput.value = "";
      customNominalInput.value = "";
      orders = {};
      renderOrderList();
      updatePayButton();
    }

    closeBtn.onclick = closeModal;

    printBtn.onclick = () => {
      showToast("Success", "Printing receipt...", "success");
      closeModal();
    };

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Render Order List on Initial Load
  renderOrderList();

  // Ganti 'orders' dengan 'archivedOrders' untuk data order archive
  const archivedOrders = [
    {
      id: "ORDR#123456789",
      type: "Dine-in",
      server: "Anisa",
      orderNo: "No.01",
      date: "30/09/2024 12:30:00",
      amount: 65000,
    },
    {
      id: "ORDR#987654321",
      type: "Take-away",
      server: "Budi",
      orderNo: "No.02",
      date: "01/10/2024 14:15:00",
      amount: 45000,
    },
  ];

  // Perbarui pemilihan elemen DOM
  const orderArchiveModal = document.getElementById("order-archive-modal");
  const closeArchiveModal = document.getElementById("close-archive-modal");
  const archiveOrderListContainer =
    document.getElementById("archive-order-list");

  // Fungsi untuk merender order archive
  function renderOrderArchive() {
    archiveOrderListContainer.innerHTML = ""; // Clear content
    archivedOrders.forEach((order) => {
      // Gunakan 'archivedOrders' bukan 'orders'
      const orderItem = document.createElement("div");
      orderItem.className =
        "border rounded-lg p-4 mb-3 flex items-center justify-between hover:bg-gray-50 transition-colors";
      orderItem.innerHTML = `
        <div class="space-y-1">
            <div class="flex items-center gap-2">
                <span class="text-gray-500">No Order</span>
                <span class="font-medium">${order.id}</span>
            </div>
            <div class="flex items-center gap-4 text-sm text-gray-600">
                <span>${order.type}</span>
                <span>${order.server}</span>
                <span>${order.orderNo}</span>
            </div>
            <div class="font-semibold">Rp ${order.amount.toLocaleString()}</div>
        </div>
        <div class="flex items-center gap-4">
            <span class="text-sm text-gray-500">${order.date}</span>
            <button class="text-blue-500 hover:text-blue-600">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
        `;
      archiveOrderListContainer.appendChild(orderItem);
    });
  }

  // Event Listener untuk membuka modal Order Archive
  const orderArchiveButton = document.querySelector(".order-archive-button");
  orderArchiveButton.addEventListener("click", () => {
    renderOrderArchive();
    orderArchiveModal.classList.remove("hidden");
    orderArchiveModal.classList.add("flex");
  });

  // Event Listener untuk menutup modal Order Archive
  closeArchiveModal.addEventListener("click", () => {
    orderArchiveModal.classList.add("hidden");
    orderArchiveModal.classList.remove("flex");
  });

  // Event Listener untuk klik di luar modal
  orderArchiveModal.addEventListener("click", (e) => {
    if (e.target === orderArchiveModal) {
      orderArchiveModal.classList.add("hidden");
      orderArchiveModal.classList.remove("flex");
    }
  });
});
