document.addEventListener('DOMContentLoaded', () => {

    const appRoot = document.getElementById('app-root');

    // --- HTML Templates ---

    const loginTemplate = `
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4">
            <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                <div class="text-center">
                    <div class="flex justify-center mb-0">
                        <img src="logo/VentasSyspro.png" alt="Logo de la empresa" class="w-57 h-57 object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <i data-lucide="shopping-cart" class="w-12 h-12 text-blue-600" style="display: none;"></i>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-800">Bienvenido a VentasSys</h1>
                    <p class="text-gray-500 mt-2">Ingresa tus credenciales para acceder</p>
                </div>
                <form id="login-form" class="space-y-6">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700">Usuario</label>
                        <div class="mt-1 relative">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3"><i data-lucide="user" class="w-5 h-5 text-gray-400"></i></span>
                            <input id="username" name="username" type="text" required class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="ej: admin">
                        </div>
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                        <div class="mt-1 relative">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3"><i data-lucide="lock" class="w-5 h-5 text-gray-400"></i></span>
                            <input id="password" name="password" type="password" required class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••">
                        </div>
                    </div>
                    <div id="error-message" class="text-red-500 text-sm text-center hidden"></div>
                    <div>
                        <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

    const dashboardTemplate = `
        <div class="flex h-screen bg-gray-200">
            <!-- Sidebar -->
            <div id="sidebar" class="w-64 bg-gray-800 text-white p-5 flex-shrink-0 flex flex-col absolute sm:relative inset-y-0 left-0 transform -translate-x-full sm:translate-x-0 transition-transform duration-200 ease-in-out z-30">
                <div class="flex items-center space-x-2 mb-10">
                    <h1 id="sidebar-company-name" class="text-2xl font-bold">MiniMarketSys</h1>
                </div>
                <nav class="flex-grow">
                    <a href="#dashboard" class="nav-link flex items-center space-x-3 py-3 px-4 rounded-lg" data-permission="viewDashboard"><i data-lucide="layout-dashboard" class="lucide"></i><span>Dashboard</span></a>
                    <a href="#ventas" class="nav-link flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-gray-700 mt-2" data-permission="manageSales"><i data-lucide="dollar-sign" class="lucide"></i><span>Venta</span></a>
                    <a href="#inventario" class="nav-link flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-gray-700 mt-2" data-permission="manageInventory"><i data-lucide="boxes" class="lucide"></i><span>Inventario</span></a>
                    <a href="#reportes" class="nav-link flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-gray-700 mt-2" data-permission="viewReports"><i data-lucide="bar-chart-3" class="lucide"></i><span>Reportes</span></a>
                    <a href="#gastos" class="nav-link flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-gray-700 mt-2" data-permission="manageExpenses"><i data-lucide="arrow-down-circle" class="lucide"></i><span>Gastos</span></a>
                    <a href="#precios" class="nav-link flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-gray-700 mt-2" data-permission="manageInventory"><i data-lucide="tag" class="lucide"></i><span>Lista de Precios</span></a>
                    <a href="#tasa" class="nav-link flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-gray-700 mt-2" data-permission="manageSettings"><i data-lucide="trending-up" class="lucide"></i><span>Tasa del Día</span></a>
                    <a href="#configuraciones" class="nav-link flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-gray-700 mt-2" data-permission="manageSettings"><i data-lucide="settings" class="lucide"></i><span>Configuraciones</span></a>
                </nav>
                <div class="text-xs text-gray-400">
                    <p>© 2025 C M, VentasSys Demo</p>
                    <p>Todos los derechos reservados.</p>
                </div>
            </div>

            <!-- Main Content -->
            <div class="flex-1 flex flex-col overflow-hidden">
                <header class="bg-white shadow-md p-4 flex justify-between items-center">
                    <div class="flex items-center">
                        <button id="menu-button" class="text-gray-500 focus:outline-none sm:hidden mr-4"><i data-lucide="menu" class="w-6 h-6"></i></button>
                        <h2 id="page-title" class="text-xl font-semibold text-gray-700"></h2>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-2">
                            <i data-lucide="user-circle" class="w-8 h-8 text-gray-600"></i>
                            <span id="username-display" class="text-gray-600"></span>
                        </div>
                        <button id="logout-btn" title="Cerrar Sesión" class="text-red-500 hover:text-red-700 focus:outline-none"><i data-lucide="log-out" class="w-6 h-6"></i></button>
                    </div>
                </header>
                <main id="main-content" class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 relative">
                    <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f8e7a0b2-38f7-4287-b5ab-2b309bfe4c62.png" alt="Large watermark logo showing VentasSys branding in light gray with modern typography and subtle shopping elements" class="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none z-0">
                </main>
            </div>
        </div>
        <!-- Modal -->
        <div id="form-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden z-50">
            <div id="modal-dialog" class="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
                <div class="flex justify-between items-center pb-3">
                    <p id="modal-title" class="text-2xl font-bold"></p>
                    <div id="modal-close-btn" class="cursor-pointer z-50"><i data-lucide="x" class="w-6 h-6"></i></div>
                </div>
                <div id="modal-content" class="mt-3"></div>
            </div>
        </div>
    `;

    // --- State Management ---
    let state = {};
    const defaultState = {
        inventory: [],
        sales: [],
        expenses: [],
        users: [{ 
            id: 1, 
            username: 'admin', 
            password: 'admin123', 
            role: 'Administrador',
            permissions: {
                viewDashboard: true,
                manageSales: true,
                manageInventory: true,
                viewReports: true,
                manageExpenses: true,
                manageSettings: true
            }
        }],
        exchangeRate: 36.50,
        currentSale: { items: [], subtotal: 0, total: 0, totalSecondary: 0 },
        settings: {
            companyName: 'Mi MiniMarket',
            companyAddress: 'Calle Principal 123, Ciudad',
            companyPhone: '0412-345-6789',
            companyRif: '',
            primaryCurrencySymbol: '$',
            secondaryCurrencySymbol: 'Bs.',
            categories: ['Bebidas', 'Charcutería', 'Panadería', 'Chucherías', 'Víveres', 'Limpieza', 'Cuidado Personal', 'Sin Categoría'],
            lastPaymentMethod: 'Efectivo (Bs.)', // Recordar último método usado
            quickAmounts: [10, 20, 50, 100, 200, 500] // Botones de monto rápido
        }
    };

    const saveState = () => {
        try {
            localStorage.setItem('miniMarketSysState', JSON.stringify(state));
        } catch (error) {
            console.error("Error saving state to localStorage", error);
            showCustomAlert("Hubo un error al guardar los datos.", 'error');
        }
    };

    const loadState = () => {
        try {
            const savedState = localStorage.getItem('miniMarketSysState');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                state = JSON.parse(JSON.stringify(defaultState)); // Deep copy default state
                
                Object.assign(state, parsedState);
                state.settings = {...defaultState.settings, ...parsedState.settings};

                if (parsedState.users && parsedState.users.length > 0) {
                    state.users = parsedState.users.map(user => {
                        if (!user.permissions) {
                            user.permissions = (user.role === 'Administrador')
                                ? { ...defaultState.users[0].permissions }
                                : { viewDashboard: true, manageSales: true, manageInventory: false, viewReports: false, manageExpenses: true, manageSettings: false };
                        }
                        return user;
                    });
                } else {
                    state.users = defaultState.users;
                }

                state.currentSale = JSON.parse(JSON.stringify(defaultState.currentSale));
            } else {
                state = JSON.parse(JSON.stringify(defaultState));
            }
        } catch (error) {
            console.error("Could not load state, reverting to default.", error);
            state = JSON.parse(JSON.stringify(defaultState));
        }
    };

    // --- View Rendering ---
    const renderLoginView = () => {
        appRoot.innerHTML = loginTemplate;
        lucide.createIcons();
        
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;
            
            loadState(); // Ensure state is loaded before attempting login
            const foundUser = state.users.find(user => user.username === username && user.password === password);

            if (foundUser) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', foundUser.username);
                renderDashboardView();
            } else {
                const errorMessage = document.getElementById('error-message');
                errorMessage.textContent = 'Usuario o contraseña incorrectos.';
                errorMessage.classList.remove('hidden');
            }
        });
    };

    const renderDashboardView = () => {
        appRoot.innerHTML = dashboardTemplate;
        initializeDashboardListeners();
        handleNavigation();
    };

    // --- Dashboard Logic ---
    const handleNavigation = () => {
        const hash = window.location.hash || '#dashboard';
        const permission = document.querySelector(`a[href="${hash}"]`)?.dataset.permission;
        
        if (permission && !checkPermission(permission)) {
            showCustomAlert('No tienes permiso para acceder a esta sección.', 'error');
            window.location.hash = '#dashboard'; // Redirect to dashboard if no permission
            return;
        }
        
        // Highlight active navigation link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('bg-gray-900', link.getAttribute('href') === hash);
        });
        
        // Update page title
        const pageTitle = document.querySelector(`a[href="${hash}"] span`)?.textContent || 'Dashboard';
        document.getElementById('page-title').textContent = pageTitle;

        const mainContent = document.getElementById('main-content');
        // Clear previous content, but preserve the background logo
        const backgroundLogo = mainContent.querySelector('img.absolute');
        mainContent.innerHTML = ''; 
        if (backgroundLogo) {
            mainContent.appendChild(backgroundLogo);
        }

        // Render content based on hash
        switch (hash) {
            case '#dashboard': renderDashboard(); break;
            case '#ventas': renderVenta(); break;
            case '#inventario': renderInventory(); break;
            case '#reportes': renderSalesReport(); break;
            case '#gastos': renderExpenses(); break;
            case '#precios': renderPriceList(); break;
            case '#tasa': renderTasa(); break;
            case '#configuraciones': renderConfiguraciones(); break;
            default: renderDashboard(); // Fallback
        }
        lucide.createIcons(); // Re-create icons for newly rendered content

        // Cierra el menú lateral solo en pantallas pequeñas (considerando "sm" de Tailwind como breakpoint)
        const sidebar = document.getElementById('sidebar');
        if (sidebar && window.innerWidth < 640) { // 640px es el breakpoint 'sm' de Tailwind CSS
            sidebar.classList.add('-translate-x-full');
        }
    };
    
    const getCurrentUser = () => {
        const username = localStorage.getItem('username');
        return state.users.find(user => user.username === username);
    };

    const checkPermission = (permissionKey) => {
        const user = getCurrentUser();
        return user && user.permissions && user.permissions[permissionKey];
    };

    const initializeDashboardListeners = () => {
        window.addEventListener('hashchange', handleNavigation);
        
        document.getElementById('menu-button').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('-translate-x-full');
        });

        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            window.removeEventListener('hashchange', handleNavigation); // Clean up event listener
            renderLoginView();
        });

        const modal = document.getElementById('form-modal');
        document.getElementById('modal-close-btn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); }); // Close modal on outside click

        document.getElementById('username-display').textContent = localStorage.getItem('username');
        document.getElementById('sidebar-company-name').textContent = state.settings.companyName;
        
        // Apply permissions to sidebar links
        document.querySelectorAll('.nav-link').forEach(link => {
            const permission = link.dataset.permission;
            if (permission && !checkPermission(permission)) {
                link.style.display = 'none'; // Hide links user doesn't have permission for
            }
        });

        // Hotkey for closing modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !document.getElementById('form-modal').classList.contains('hidden')) {
                closeModal();
            }
        });
    };

    // --- Utility Functions ---
    const formatCurrency = (amount, currencySymbol) => {
        const symbol = currencySymbol || state.settings.primaryCurrencySymbol;
        const formattedAmount = new Intl.NumberFormat('es-VE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
        
        // Special formatting for secondary currency to avoid prefixing
        if (symbol === state.settings.secondaryCurrencySymbol) {
            return `${formattedAmount} ${symbol}`;
        }
        
        return `${symbol} ${formattedAmount}`;
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const formatTime = () => new Date().toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' });

    const openModal = (title, contentHTML, size = 'max-w-2xl') => {
        document.getElementById('modal-dialog').className = `relative top-10 mx-auto p-5 border w-full ${size} shadow-lg rounded-md bg-white`;
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-content').innerHTML = contentHTML;
        document.getElementById('form-modal').classList.remove('hidden');
        lucide.createIcons(); // Re-create icons for modal content
    };

    const closeModal = () => {
        document.getElementById('form-modal').classList.add('hidden');
        document.getElementById('modal-content').innerHTML = ''; // Clear modal content
    };
    
    const showCustomAlert = (message, type = 'info') => {
        const alertContainer = document.createElement('div');
        const colors = { success: 'bg-green-500', error: 'bg-red-500', info: 'bg-blue-500', warning: 'bg-yellow-500' };
        const icons = { success: 'check-circle', error: 'x-circle', info: 'info', warning: 'alert-triangle' };
        
        alertContainer.className = `fixed bottom-5 right-5 ${colors[type]} text-white py-3 px-6 rounded-lg shadow-xl z-50 transition-transform transform translate-y-full flex items-center space-x-3 max-w-md`;
        alertContainer.innerHTML = `
            <i data-lucide="${icons[type]}" class="w-5 h-5 flex-shrink-0"></i>
            <span class="text-sm">${message}</span>
        `;
        document.body.appendChild(alertContainer);
        lucide.createIcons();
        
        // Animate in
        setTimeout(() => alertContainer.classList.remove('translate-y-full'), 100);
        // Animate out and remove
        setTimeout(() => {
            alertContainer.classList.add('translate-y-full');
            setTimeout(() => alertContainer.remove(), 500);
        }, 3500);
    };

    const showCustomConfirm = (message) => {
        return new Promise((resolve) => {
            const confirmHTML = `
                <div class="flex items-center space-x-3 mb-6">
                    <i data-lucide="help-circle" class="w-8 h-8 text-yellow-500"></i>
                    <p class="text-lg">${message}</p>
                </div>
                <div class="flex justify-end space-x-3">
                    <button id="confirm-cancel" class="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 flex items-center space-x-2">
                        <i data-lucide="x" class="w-4 h-4"></i>
                        <span>Cancelar</span>
                    </button>
                    <button id="confirm-ok" class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 flex items-center space-x-2">
                        <i data-lucide="check" class="w-4 h-4"></i>
                        <span>Confirmar</span>
                    </button>
                </div>
            `;
            openModal('Confirmación', confirmHTML, 'max-w-md');
            document.getElementById('confirm-ok').onclick = () => { closeModal(); resolve(true); };
            document.getElementById('confirm-cancel').onclick = () => { closeModal(); resolve(false); };
        });
    };

    const getCategoryIcon = (categoryName) => {
        const iconMap = {
            'bebidas': 'glass-water',
            'charcutería': 'beef',
            'panadería': 'croissant',
            'chucherías': 'candy',
            'víveres': 'shopping-basket',
            'limpieza': 'spray-can',
            'cuidado personal': 'sparkles',
        };
        return iconMap[categoryName.toLowerCase()] || 'package'; // Default icon
    };

    const getPaymentMethodIcon = (paymentMethod) => {
        const iconMap = {
            'efectivo': 'banknote',
            'pago móvil': 'smartphone',
            'transferencia': 'send',
            'punto de venta': 'credit-card',
            'biopago': 'fingerprint'
        };
        const key = paymentMethod.toLowerCase().split(' (')[0]; // Remove currency part
        return iconMap[key] || 'wallet';
    };

    // Función para verificar stock antes de confirmar venta
    const verifyStockAvailability = () => {
        for (const item of state.currentSale.items) {
            const productInStock = state.inventory.find(p => p.id === item.id);
            if (!productInStock) {
                return { available: false, message: `El producto "${item.name}" ya no está disponible en el inventario.` };
            }
            
            const requiredStock = item.isWeightBased ? item.weight : item.quantity;
            if (productInStock.quantity < requiredStock) {
                return { 
                    available: false, 
                    message: `Stock insuficiente para "${item.name}". Disponible: ${productInStock.quantity}${item.isWeightBased ? ' Kg' : ''}, Requerido: ${requiredStock}${item.isWeightBased ? ' Kg' : ''}` 
                };
            }
        }
        return { available: true };
    };

    // --- Full Section Rendering ---
    const renderDashboard = () => {
        const mainContent = document.getElementById('main-content');
        const today = new Date().toISOString().split('T')[0];
        const salesToday = state.sales.filter(s => s.date.startsWith(today));
        const totalSalesTodayPrimary = salesToday.reduce((sum, s) => sum + (s.total || 0), 0);
        const totalSalesTodaySecondary = salesToday.reduce((sum, s) => sum + (s.totalSecondary || 0), 0);

        const expensesToday = state.expenses.filter(e => e.date.startsWith(today));
        const totalExpensesTodayPrimary = expensesToday.filter(e => e.currency === state.settings.primaryCurrencySymbol).reduce((sum, e) => sum + e.amount, 0);
        const totalExpensesTodaySecondary = expensesToday.filter(e => e.currency === state.settings.secondaryCurrencySymbol).reduce((sum, e) => sum + e.amount, 0);
        
        const lowStockProducts = state.inventory.filter(p => p.quantity <= 5).length;

        // Preserve the background logo
        const backgroundLogo = mainContent.querySelector('img.absolute');
        mainContent.innerHTML = ''; 
        if (backgroundLogo) {
            mainContent.appendChild(backgroundLogo);
        }

        mainContent.insertAdjacentHTML('beforeend', `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                <div class="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Ventas Hoy</p>
                        <p class="text-2xl font-bold text-blue-600">${formatCurrency(totalSalesTodayPrimary, state.settings.primaryCurrencySymbol)}</p>
                        <p class="text-lg text-gray-600">${formatCurrency(totalSalesTodaySecondary, state.settings.secondaryCurrencySymbol)}</p>
                    </div>
                    <div class="bg-blue-100 p-3 rounded-full"><i data-lucide="dollar-sign" class="text-blue-600"></i></div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Gastos Hoy</p>
                        <p class="text-2xl font-bold text-red-600">${formatCurrency(totalExpensesTodayPrimary, state.settings.primaryCurrencySymbol)}</p>
                        <p class="text-lg text-gray-600">${formatCurrency(totalExpensesTodaySecondary, state.settings.secondaryCurrencySymbol)}</p>
                    </div>
                    <div class="bg-red-100 p-3 rounded-full"><i data-lucide="arrow-down" class="text-red-600"></i></div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Productos con Bajo Stock</p>
                        <p class="text-3xl font-bold text-yellow-600">${lowStockProducts}</p>
                    </div>
                    <div class="bg-yellow-100 p-3 rounded-full"><i data-lucide="package-x" class="text-yellow-600"></i></div>
                </div>
            </div>`);
        lucide.createIcons();
    };

    const renderInventory = () => {
        const mainContent = document.getElementById('main-content');
        // Preserve the background logo
        const backgroundLogo = mainContent.querySelector('img.absolute');
        mainContent.innerHTML = ''; 
        if (backgroundLogo) {
            mainContent.appendChild(backgroundLogo);
        }

        mainContent.insertAdjacentHTML('beforeend', `
            <div class="flex justify-between items-center mb-6 relative z-10">
                <h2 class="text-2xl font-semibold text-gray-800">Inventario de Productos</h2>
                <button id="add-product-btn" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center space-x-2"><i data-lucide="plus-circle"></i><span>Añadir Producto</span></button>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md overflow-x-auto relative z-10">
                <div class="flex items-center space-x-4 mb-4">
                    <label for="inventory-category-filter" class="text-sm font-medium text-gray-700">Filtrar por Categoría:</label>
                    <select id="inventory-category-filter" class="rounded-md border-gray-300 shadow-sm">
                        <option value="all">Todas</option>
                        ${state.settings.categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                    </select>
                </div>
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" data-sort="name">Nombre <i data-lucide="arrow-down-up" class="inline-block w-4 h-4 ml-1"></i></th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código de Barras</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" data-sort="quantity">Stock <i data-lucide="arrow-down-up" class="inline-block w-4 h-4 ml-1"></i></th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Compra</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" data-sort="salePrice">Precio Venta <i data-lucide="arrow-down-up" class="inline-block w-4 h-4 ml-1"></i></th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="inventory-table-body" class="bg-white divide-y divide-gray-200"></tbody>
                </table>
            </div>`);

        const tableBody = document.getElementById('inventory-table-body');
        const categoryFilter = document.getElementById('inventory-category-filter');
        let currentSortColumn = null;
        let currentSortDirection = 'asc'; // 'asc' or 'desc'

        const renderFilteredAndSortedInventory = () => {
            const selectedCategory = categoryFilter.value;
            let filteredProducts = state.inventory;

            if (selectedCategory !== 'all') {
                filteredProducts = state.inventory.filter(p => p.category === selectedCategory);
            }

            if (currentSortColumn) {
                filteredProducts.sort((a, b) => {
                    let valA = a[currentSortColumn];
                    let valB = b[currentSortColumn];

                    if (typeof valA === 'string') {
                        valA = valA.toLowerCase();
                        valB = valB.toLowerCase();
                    }

                    if (valA < valB) return currentSortDirection === 'asc' ? -1 : 1;
                    if (valA > valB) return currentSortDirection === 'asc' ? 1 : -1;
                    return 0;
                });
            }

            tableBody.innerHTML = filteredProducts.length === 0 
                ? `<tr><td colspan="7" class="text-center py-4">No hay productos en el inventario para esta categoría.</td></tr>`
                : filteredProducts.map(product => `
                    <tr class="${product.quantity <= 5 ? 'low-stock-row' : ''}">
                        <td class="px-6 py-4 whitespace-nowrap flex items-center">
                            ${product.quantity <= 5 ? '<i data-lucide="alert-triangle" class="w-5 h-5 text-yellow-600 mr-2"></i>' : ''}
                            ${product.name}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">${product.category}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${product.barcode || '-'}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${product.quantity} ${product.soldByWeight ? 'Kg' : ''}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${formatCurrency(product.purchasePrice || 0, state.settings.primaryCurrencySymbol)}</td>
                        <td class="px-6 py-4 whitespace-nowrap">${formatCurrency(product.salePrice, state.settings.primaryCurrencySymbol)} ${product.soldByWeight ? '/ Kg' : ''}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button class="edit-product-btn text-indigo-600 hover:text-indigo-900" data-id="${product.id}"><i data-lucide="edit" class="w-5 h-5"></i></button>
                            <button class="delete-product-btn text-red-600 hover:text-red-900 ml-4" data-id="${product.id}"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
                        </td>
                    </tr>`).join('');
            lucide.createIcons();
        };

        renderFilteredAndSortedInventory();

        categoryFilter.addEventListener('change', renderFilteredAndSortedInventory);

        document.querySelectorAll('th[data-sort]').forEach(header => {
            header.addEventListener('click', () => {
                const sortColumn = header.dataset.sort;
                if (currentSortColumn === sortColumn) {
                    currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    currentSortColumn = sortColumn;
                    currentSortDirection = 'asc';
                }
                renderFilteredAndSortedInventory();
            });
        });

        document.getElementById('add-product-btn').addEventListener('click', () => showProductForm());
        tableBody.addEventListener('click', async (e) => {
            const editBtn = e.target.closest('.edit-product-btn');
            if (editBtn) {
                const product = state.inventory.find(p => p.id === parseInt(editBtn.dataset.id));
                showProductForm(product);
            }
            const deleteBtn = e.target.closest('.delete-product-btn');
            if (deleteBtn && await showCustomConfirm('¿Estás seguro de que quieres eliminar este producto? Esta acción es irreversible.')) {
                state.inventory = state.inventory.filter(p => p.id !== parseInt(deleteBtn.dataset.id));
                saveState();
                renderInventory();
                showCustomAlert('Producto eliminado correctamente.', 'success');
            }
        });
        lucide.createIcons();
    };

    const showProductForm = (product = null) => {
        const isEdit = product !== null;
        const formHTML = `
            <form id="product-form">
                <input type="hidden" id="product-id" value="${isEdit ? product.id : ''}">
                <div class="mb-4">
                    <label for="product-name" class="block text-sm font-medium text-gray-700">Nombre del producto</label>
                    <input type="text" id="product-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required value="${isEdit ? product.name : ''}">
                </div>
                <div class="mb-4">
                    <label for="product-category" class="block text-sm font-medium text-gray-700">Categoría</label>
                    <select id="product-category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        ${state.settings.categories.map(cat => `<option value="${cat}" ${isEdit && product.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                    </select>
                </div>
                 <div class="mb-4">
                    <label for="product-barcode" class="block text-sm font-medium text-gray-700">Código de Barras</label>
                    <input type="text" id="product-barcode" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="${isEdit && product.barcode ? product.barcode : ''}">
                </div>
                <div class="flex items-center mb-4">
                    <input id="product-sold-by-weight" type="checkbox" class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" ${isEdit && product.soldByWeight ? 'checked' : ''}>
                    <label for="product-sold-by-weight" class="ml-2 block text-sm text-gray-900">Vendido por peso</label>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label for="product-purchase-price" class="block text-sm font-medium text-gray-700">Precio Compra (${state.settings.primaryCurrencySymbol})</label>
                        <input type="number" step="0.01" id="product-purchase-price" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="${isEdit ? (product.purchasePrice || 0) : '0'}">
                    </div>
                    <div>
                        <label for="product-sale-price" class="block text-sm font-medium text-gray-700">
                            Precio de Venta <span id="price-unit-label">${isEdit && product.soldByWeight ? '/ Kg' : ''}</span> (${state.settings.primaryCurrencySymbol})
                        </label>
                        <input type="number" step="0.01" id="product-sale-price" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required value="${isEdit ? product.salePrice : ''}">
                    </div>
                </div>
                <div class="mb-4">
                    <label for="product-quantity" class="block text-sm font-medium text-gray-700">
                        Stock <span id="stock-unit-label">${isEdit && product.soldByWeight ? '(Kg)' : '(Unidades)'}</span>
                    </label>
                    <input type="number" id="product-quantity" step="any" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required value="${isEdit ? product.quantity : ''}">
                </div>
                <div class="text-right space-x-2">
                    <button type="button" id="modal-cancel-btn" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">${isEdit ? 'Actualizar' : 'Guardar'}</button>
                </div>
            </form>`;
        openModal(isEdit ? 'Editar Producto' : 'Añadir Producto', formHTML, 'max-w-md');
        
        const soldByWeightCheckbox = document.getElementById('product-sold-by-weight');
        const priceUnitLabel = document.getElementById('price-unit-label');
        const stockUnitLabel = document.getElementById('stock-unit-label');

        soldByWeightCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                priceUnitLabel.textContent = '/ Kg';
                stockUnitLabel.textContent = '(Kg)';
            } else {
                priceUnitLabel.textContent = '';
                stockUnitLabel.textContent = '(Unidades)';
            }
        });

        document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);
        document.getElementById('product-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('product-id').value;
            const newProductData = {
                id: isEdit ? parseInt(id) : Date.now(),
                name: document.getElementById('product-name').value,
                category: document.getElementById('product-category').value,
                barcode: document.getElementById('product-barcode').value,
                soldByWeight: document.getElementById('product-sold-by-weight').checked,
                quantity: parseFloat(document.getElementById('product-quantity').value),
                salePrice: parseFloat(document.getElementById('product-sale-price').value),
                purchasePrice: parseFloat(document.getElementById('product-purchase-price').value) || 0,
            };

            if (isEdit) {
                state.inventory = state.inventory.map(p => p.id === newProductData.id ? newProductData : p);
                showCustomAlert('Producto actualizado correctamente.', 'success');
            } else {
                state.inventory.push(newProductData);
                showCustomAlert('Producto añadido correctamente.', 'success');
            }
            saveState();
            renderInventory();
            closeModal();
        });
    };

    const renderVenta = () => {
        const mainContent = document.getElementById('main-content');
        // Preserve the background logo
        const backgroundLogo = mainContent.querySelector('img.absolute');
        mainContent.innerHTML = ''; 
        if (backgroundLogo) {
            mainContent.appendChild(backgroundLogo);
        }

        mainContent.insertAdjacentHTML('beforeend', `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-150px)] relative z-10">
                <div class="absolute top-0 right-0 bg-yellow-200 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-bl-lg">
                    Dolar BCV: ${state.exchangeRate.toFixed(2)} ${state.settings.secondaryCurrencySymbol}
                </div>
                <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <h3 class="text-xl font-semibold mb-4">Seleccionar Producto</h3>
                    <div class="mb-4">
                        <input type="text" id="product-search-input" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="Buscar por nombre o escanear código de barras...">
                    </div>
                    <div id="category-card-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 flex-grow overflow-y-auto p-2"></div>
                    <div id="product-search-results" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 flex-grow overflow-y-auto p-2 hidden"></div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md flex flex-col">
                    <h3 class="text-xl font-semibold mb-4">Venta</h3>
                    <div id="cart-items-container" class="flex-grow overflow-y-auto"></div>
                    <div class="mt-auto pt-4 border-t">
                        <div id="sale-summary" class="space-y-2"></div>
                        <button id="proceed-to-payment-btn" class="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400">Proceder al Pago</button>
                        <button id="cancelar-venta-btn" class="mt-2 w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600">Cancelar</button>
                    </div>
                </div>
            </div>`);
        
        const categoryGrid = document.getElementById('category-card-grid');
        const productSearchResults = document.getElementById('product-search-results');
        const productSearchInput = document.getElementById('product-search-input');

        const renderCategories = () => {
            categoryGrid.innerHTML = state.settings.categories.map(cat => `
                <div class="category-card bg-white border rounded-lg p-4 flex flex-col text-center justify-center items-center cursor-pointer" data-category="${cat}">
                    <i data-lucide="${getCategoryIcon(cat)}" class="w-10 h-10 mb-2 text-blue-600"></i>
                    <h4 class="font-semibold text-sm leading-tight">${cat}</h4>
                </div>
            `).join('');
            lucide.createIcons();
        };

        const renderSearchResults = (searchTerm) => {
            const filteredProducts = state.inventory.filter(p => 
                (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || (p.barcode && p.barcode.includes(searchTerm))) && p.quantity > 0
            );

            if (searchTerm.length > 0) {
                categoryGrid.classList.add('hidden');
                productSearchResults.classList.remove('hidden');
                productSearchResults.innerHTML = filteredProducts.length === 0
                    ? `<p class="col-span-full text-center text-gray-500">No se encontraron productos.</p>`
                    : filteredProducts.map(product => `
                        <div class="product-card bg-white border rounded-lg p-2 flex flex-col text-center cursor-pointer" data-id="${product.id}">
                            <div class="h-10 flex items-center justify-center"><h4 class="font-semibold text-sm leading-tight">${product.name}</h4></div>
                            <p class="text-base font-bold text-blue-600 mt-auto pt-1">${formatCurrency(product.salePrice, state.settings.primaryCurrencySymbol)} ${product.soldByWeight ? '/ Kg' : ''}</p>
                        </div>`).join('');
            } else {
                categoryGrid.classList.remove('hidden');
                productSearchResults.classList.add('hidden');
            }
            lucide.createIcons();
        };

        renderCategories();
        renderCurrentSale();
        
        categoryGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.category-card');
            if (card) {
                showCategoryProductsView(card.dataset.category);
            }
        });

        productSearchInput.addEventListener('input', (e) => {
            renderSearchResults(e.target.value);
        });

        productSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value;
                const foundProduct = state.inventory.find(p => (p.barcode === searchTerm || p.name.toLowerCase() === searchTerm.toLowerCase()) && p.quantity > 0);
                if (foundProduct) {
                    addProductToSale(foundProduct.id);
                    e.target.value = ''; // Clear input after adding
                    renderSearchResults(''); // Clear search results
                } else {
                    showCustomAlert('Producto no encontrado o sin stock.', 'error');
                }
            }
        });

        productSearchResults.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (card) {
                addProductToSale(parseInt(card.dataset.id));
                productSearchInput.value = ''; // Clear search input
                renderSearchResults(''); // Clear search results
            }
        });

        document.getElementById('cart-items-container').addEventListener('input', e => {
            if (e.target.classList.contains('sale-item-qty')) {
                const productId = parseInt(e.target.dataset.id);
                const newQuantity = parseFloat(e.target.value); // Use parseFloat for potential weight-based items
                updateSaleItemQuantity(productId, newQuantity, e);
            }
        });
        document.getElementById('cart-items-container').addEventListener('click', e => {
            const removeBtn = e.target.closest('.remove-sale-item-btn');
            if (removeBtn) removeProductFromSale(parseInt(removeBtn.dataset.id));
        });
        document.getElementById('proceed-to-payment-btn').addEventListener('click', showTransactionModal);
        document.getElementById('cancelar-venta-btn').addEventListener('click', cancelSale);
    };

    const showCategoryProductsView = (category) => {
        const modalHTML = `
            <div class="flex flex-col h-[70vh]">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="text" id="category-name-search" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="Buscar por nombre...">
                    <input type="text" id="category-barcode-search" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="Escanear código de barras...">
                </div>
                <div id="category-product-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 flex-grow overflow-y-auto p-2">
                    <!-- Products will be rendered here -->
                </div>
            </div>
        `;
        openModal(`Productos en ${category}`, modalHTML);

        const renderCategoryProducts = () => {
            const nameFilter = document.getElementById('category-name-search').value.toLowerCase();
            const barcodeFilter = document.getElementById('category-barcode-search').value;
            const productGrid = document.getElementById('category-product-grid');

            const filteredProducts = state.inventory.filter(p => {
                const inCategory = p.category === category;
                if (!inCategory) return false;

                const nameMatch = nameFilter ? p.name.toLowerCase().includes(nameFilter) : true;
                const barcodeMatch = barcodeFilter ? (p.barcode && p.barcode.includes(barcodeFilter)) : true;
                
                return p.quantity > 0 && nameMatch && barcodeMatch;
            });

            productGrid.innerHTML = filteredProducts.length === 0
                ? `<p class="col-span-full text-center text-gray-500">No se encontraron productos en esta categoría.</p>`
                : filteredProducts.map(product => `
                    <div class="product-card bg-white border rounded-lg p-2 flex flex-col text-center cursor-pointer" data-id="${product.id}">
                        <div class="h-10 flex items-center justify-center"><h4 class="font-semibold text-sm leading-tight">${product.name}</h4></div>
                        <p class="text-base font-bold text-blue-600 mt-auto pt-1">${formatCurrency(product.salePrice, state.settings.primaryCurrencySymbol)} ${product.soldByWeight ? '/ Kg' : ''}</p>
                    </div>`).join('');
        };

        renderCategoryProducts();

        const nameSearchInput = document.getElementById('category-name-search');
        const barcodeSearchInput = document.getElementById('category-barcode-search');

        nameSearchInput.addEventListener('input', renderCategoryProducts);
        barcodeSearchInput.addEventListener('input', renderCategoryProducts);

        barcodeSearchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value;
                const foundProduct = state.inventory.find(p => p.barcode === searchTerm && p.category === category);
                if (foundProduct) {
                    addProductToSale(foundProduct.id);
                    e.target.value = ''; // Clear barcode input after adding
                    renderCategoryProducts();
                } else {
                    showCustomAlert('Producto no encontrado con ese código de barras.', 'error');
                }
            }
        });

        document.getElementById('category-product-grid').addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (card) {
                addProductToSale(parseInt(card.dataset.id));
            }
        });
    };
    
    const showWeightModal = (product) => {
        const { primaryCurrencySymbol, secondaryCurrencySymbol } = state.settings;
        const modalHTML = `
            <div>
                <p class="mb-2">Precio: ${formatCurrency(product.salePrice, primaryCurrencySymbol)} / Kg</p>
                <p class="mb-4">Stock disponible: ${product.quantity.toFixed(3)} Kg</p>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label for="weight-input" class="block text-sm font-medium text-gray-700">Peso (Gramos)</label>
                        <input type="number" id="weight-input" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                    <div>
                        <label for="price-input-primary" class="block text-sm font-medium text-gray-700">Monto (${primaryCurrencySymbol})</label>
                        <input type="number" step="0.01" id="price-input-primary" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                    <div>
                        <label for="price-input-secondary" class="block text-sm font-medium text-gray-700">Monto (${secondaryCurrencySymbol})</label>
                        <input type="number" step="0.01" id="price-input-secondary" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                </div>

                <div class="text-right mt-4">
                    <button id="add-weight-product-btn" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Añadir al Carrito</button>
                </div>
            </div>
        `;
        openModal(`Ingresar Peso para ${product.name}`, modalHTML, 'max-w-lg');

        const weightInput = document.getElementById('weight-input');
        const pricePrimaryInput = document.getElementById('price-input-primary');
        const priceSecondaryInput = document.getElementById('price-input-secondary');
        const addButton = document.getElementById('add-weight-product-btn');

        weightInput.addEventListener('input', () => {
            const weightInGrams = parseFloat(weightInput.value) || 0;
            if (weightInGrams > 0) {
                pricePrimaryInput.value = '';
                priceSecondaryInput.value = '';
                const weightInKg = weightInGrams / 1000;
                const finalPricePrimary = weightInKg * product.salePrice;
                const finalPriceSecondary = finalPricePrimary * state.exchangeRate;
                
                pricePrimaryInput.value = finalPricePrimary.toFixed(2);
                priceSecondaryInput.value = finalPriceSecondary.toFixed(2);
            }
        });

        pricePrimaryInput.addEventListener('input', () => {
            const priceInPrimary = parseFloat(pricePrimaryInput.value) || 0;
            if (priceInPrimary > 0) {
                weightInput.value = '';
                priceSecondaryInput.value = '';
                const weightInKg = priceInPrimary / product.salePrice;
                const weightInGrams = weightInKg * 1000;
                const priceInSecondary = priceInPrimary * state.exchangeRate;

                weightInput.value = weightInGrams.toFixed(0);
                priceSecondaryInput.value = priceInSecondary.toFixed(2);
            }
        });

        priceSecondaryInput.addEventListener('input', () => {
            const priceInSecondary = parseFloat(priceSecondaryInput.value) || 0;
            if (priceInSecondary > 0) {
                weightInput.value = '';
                pricePrimaryInput.value = '';
                const priceInPrimary = priceInSecondary / state.exchangeRate;
                const weightInKg = priceInPrimary / product.salePrice;
                const weightInGrams = weightInKg * 1000;

                weightInput.value = weightInGrams.toFixed(0);
                pricePrimaryInput.value = priceInPrimary.toFixed(2);
            }
        });

        addButton.addEventListener('click', () => {
            const weightInGrams = parseFloat(weightInput.value);
            if (isNaN(weightInGrams) || weightInGrams <= 0) {
                showCustomAlert('Por favor, ingrese un peso o monto válido.', 'error');
                return;
            }

            const weightInKg = weightInGrams / 1000;
            
            if (weightInKg > product.quantity) {
                showCustomAlert(`No hay suficiente stock. Disponible: ${product.quantity.toFixed(3)} Kg.`, 'error');
                return;
            }

            const finalPrice = weightInKg * product.salePrice;
            
            state.currentSale.items.push({
                id: product.id,
                name: product.name,
                salePrice: finalPrice, // Total price for the weight
                purchasePrice: product.purchasePrice, // Price per kg for profit calculation
                quantity: 1, // Treat as one item in the cart for display simplicity
                isWeightBased: true,
                weight: weightInKg // Store weight in Kg
            });

            renderCurrentSale();
            closeModal();
            showCustomAlert('Producto por peso añadido al carrito.', 'success');
        });
    };

    const addProductToSale = (productId) => {
        const product = state.inventory.find(p => p.id === productId);
        if (!product) return;

        if (product.soldByWeight) {
            showWeightModal(product);
            return;
        }

        const existingItem = state.currentSale.items.find(item => item.id === product.id && !item.isWeightBased);
        if (existingItem) {
            if (existingItem.quantity < product.quantity) {
                existingItem.quantity++;
                showCustomAlert(`Cantidad de ${product.name} actualizada.`, 'info');
            } else {
                showCustomAlert('No hay más stock de este producto.', 'error');
            }
        } else {
            state.currentSale.items.push({
                id: product.id, name: product.name, quantity: 1, salePrice: product.salePrice,
                purchasePrice: product.purchasePrice || 0, isWeightBased: false
            });
            showCustomAlert(`${product.name} añadido al carrito.`, 'success');
        }
        renderCurrentSale();
    };

    const updateSaleItemQuantity = (productId, newQuantity, event) => {
        const itemInSale = state.currentSale.items.find(item => item.id === productId);
        const productInStock = state.inventory.find(p => p.id === productId);
        if (!itemInSale || !productInStock || itemInSale.isWeightBased) return; // Prevent quantity change for weight-based items

        if (isNaN(newQuantity) || newQuantity < 0) {
            showCustomAlert('La cantidad debe ser un número positivo.', 'error');
            event.target.value = itemInSale.quantity; // Revert input value
            return;
        }

        if (newQuantity > productInStock.quantity) {
            showCustomAlert(`Stock máximo para ${productInStock.name} es ${productInStock.quantity}`, 'error');
            event.target.value = itemInSale.quantity; // Revert input value
            return;
        }

        if (newQuantity === 0) {
            removeProductFromSale(productId);
            showCustomAlert(`${productInStock.name} eliminado del carrito.`, 'info');
        } else {
            itemInSale.quantity = newQuantity;
            showCustomAlert(`Cantidad de ${productInStock.name} actualizada a ${newQuantity}.`, 'info');
        }
        renderCurrentSale();
    };

    const removeProductFromSale = (productId) => {
        // Since weight-based items are added one by one, we just need to remove the first one found.
        const itemIndex = state.currentSale.items.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            const removedItemName = state.currentSale.items[itemIndex].name;
            state.currentSale.items.splice(itemIndex, 1);
            showCustomAlert(`${removedItemName} eliminado del carrito.`, 'info');
        }
        renderCurrentSale();
    };

    const renderCurrentSale = () => {
        const cartContainer = document.getElementById('cart-items-container');
        const summaryDiv = document.getElementById('sale-summary');
        
        if (!cartContainer || !summaryDiv) return; // Exit if elements are not on the page

        const subtotal = state.currentSale.items.reduce((sum, item) => {
            if (item.isWeightBased) {
                return sum + item.salePrice; // salePrice is already calculated for the weight
            }
            return sum + (item.quantity * item.salePrice);
        }, 0);
        const total = subtotal; // No tax calculation for now
        const totalSecondary = total * state.exchangeRate;

        state.currentSale.subtotal = subtotal;
        state.currentSale.total = total;
        state.currentSale.totalSecondary = totalSecondary;

        cartContainer.innerHTML = state.currentSale.items.length === 0
            ? `<p class="text-center text-gray-500">No Hay Articulos.</p>`
            : state.currentSale.items.map(item => {
                if (item.isWeightBased) {
                    return `
                    <div class="flex justify-between items-center mb-2">
                        <div>
                            <p class="font-semibold text-sm">${item.name} (${item.weight.toFixed(3)} Kg)</p>
                            <p class="text-xs text-gray-600">${formatCurrency(item.salePrice, state.settings.primaryCurrencySymbol)}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="w-16 text-center">1</span>
                            <button class="remove-sale-item-btn text-red-500 hover:text-red-700" data-id="${item.id}"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </div>
                    </div>`;
                } else {
                    return `
                    <div class="flex justify-between items-center mb-2">
                        <div>
                            <p class="font-semibold text-sm">${item.name}</p>
                            <p class="text-xs text-gray-600">${formatCurrency(item.salePrice, state.settings.primaryCurrencySymbol)}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="number" value="${item.quantity}" min="0" class="w-16 rounded-md border-gray-300 text-center sale-item-qty" data-id="${item.id}">
                            <button class="remove-sale-item-btn text-red-500 hover:text-red-700" data-id="${item.id}"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </div>
                    </div>`;
                }
            }).join('');
        
        summaryDiv.innerHTML = `
            <div class="flex justify-between"><span class="text-gray-600">Subtotal:</span><span class="font-bold text-gray-800">${formatCurrency(subtotal, state.settings.primaryCurrencySymbol)}</span></div>
            <div class="flex justify-between font-semibold"><span class="text-gray-600">Total (${state.settings.secondaryCurrencySymbol}):</span><span class="text-gray-800">${formatCurrency(totalSecondary, state.settings.secondaryCurrencySymbol)}</span></div>
            <div class="flex justify-between text-xl font-bold mt-1"><span class="text-blue-600">Total (${state.settings.primaryCurrencySymbol}):</span><span class="text-blue-600">${formatCurrency(total, state.settings.primaryCurrencySymbol)}</span></div>
        `;
        
        document.getElementById('proceed-to-payment-btn').disabled = state.currentSale.items.length === 0;
        lucide.createIcons();
    };

    const showTransactionModal = () => {
        // Verificar stock antes de mostrar el modal de pago
        const stockCheck = verifyStockAvailability();
        if (!stockCheck.available) {
            showCustomAlert(stockCheck.message, 'error');
            return;
        }

        const { total, totalSecondary } = state.currentSale;
        const { primaryCurrencySymbol, secondaryCurrencySymbol } = state.settings;
        const totalItems = state.currentSale.items.reduce((sum, item) => sum + (item.isWeightBased ? 1 : item.quantity), 0);
        const currentTime = formatTime();
        
        const formHTML = `
            <div class="space-y-6">
                <!-- Información de la venta -->
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="bg-blue-100 p-2 rounded-full">
                                <i data-lucide="shopping-cart" class="w-6 h-6 text-blue-600"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-blue-900">Resumen de Venta</h3>
                                <p class="text-sm text-blue-700">Total de artículos: ${totalItems} | Hora: ${currentTime}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-sm text-gray-600">Total a Pagar</p>
                            <p class="text-3xl font-bold text-blue-600">${formatCurrency(total, primaryCurrencySymbol)}</p>
                            <p class="text-lg text-gray-500">${formatCurrency(totalSecondary, secondaryCurrencySymbol)}</p>
                        </div>
                    </div>
                    
                    <!-- Desglose de productos -->
                    <div class="bg-white p-3 rounded-lg border border-gray-200 max-h-32 overflow-y-auto">
                        <div class="text-xs space-y-1">
                            ${state.currentSale.items.map(item => {
                                const itemTotal = item.isWeightBased ? item.salePrice : item.quantity * item.salePrice;
                                const displayQty = item.isWeightBased ? `${item.weight.toFixed(3)} Kg` : `${item.quantity} und`;
                                return `<div class="flex justify-between">
                                    <span>${item.name} (${displayQty})</span>
                                    <span class="font-semibold">${formatCurrency(itemTotal, primaryCurrencySymbol)}</span>
                                </div>`;
                            }).join('')}
                        </div>
                    </div>
                </div>

                <form id="transaction-form">
                    <!-- Información opcional del cliente -->
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                            <i data-lucide="user" class="w-4 h-4 mr-2"></i>
                            Información del Cliente (Opcional)
                        </h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input type="text" id="customer-name" class="text-sm rounded-md border-gray-300 shadow-sm" placeholder="Nombre del cliente">
                            <input type="tel" id="customer-phone" class="text-sm rounded-md border-gray-300 shadow-sm" placeholder="Teléfono">
                        </div>
                    </div>

                    <!-- Método de pago -->
                    <div class="space-y-4">
                        <h4 class="text-lg font-semibold text-gray-800 flex items-center">
                            <i data-lucide="credit-card" class="w-5 h-5 mr-2"></i>
                            Método de Pago
                        </h4>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
                            ${[
                                `Efectivo (${secondaryCurrencySymbol})`,
                                `Efectivo (${primaryCurrencySymbol})`,
                                'Pago Móvil',
                                'Transferencia',
                                'Punto de Venta',
                                'Biopago'
                            ].map((method, index) => `
                                <label class="payment-method-option cursor-pointer">
                                    <input type="radio" name="payment-method" value="${method}" class="sr-only" ${(state.settings.lastPaymentMethod === method || index === 0) ? 'checked' : ''}>
                                    <div class="payment-method-card border-2 border-gray-200 rounded-lg p-3 text-center hover:border-blue-300 transition-colors">
                                        <i data-lucide="${getPaymentMethodIcon(method)}" class="w-6 h-6 mx-auto mb-2 text-gray-600"></i>
                                        <div class="text-xs font-medium text-gray-700">${method}</div>
                                    </div>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Campo de referencia -->
                    <div id="reference-container" class="hidden">
                        <label for="payment-reference" class="block text-sm font-medium text-gray-700 mb-2">
                            <i data-lucide="hash" class="w-4 h-4 inline mr-1"></i>
                            Número de Referencia <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="payment-reference" class="w-full rounded-md border-gray-300 shadow-sm" placeholder="Ingrese el número de referencia">
                    </div>

                    <!-- Detalles de pago en efectivo -->
                    <div id="cash-payment-details" class="hidden space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div class="flex items-center space-x-2 mb-3">
                            <i data-lucide="banknote" class="w-5 h-5 text-green-600"></i>
                            <h4 class="font-semibold text-green-800">Pago en Efectivo</h4>
                        </div>
                        
                        <!-- Botones de monto rápido -->
                        <div class="space-y-2">
                            <p class="text-sm text-gray-700">Montos rápidos:</p>
                            <div id="quick-amount-buttons" class="grid grid-cols-3 gap-2">
                                <!-- Se llenarán dinámicamente -->
                            </div>
                        </div>

                        <div>
                            <label for="amount-received" class="block text-sm font-medium text-gray-700 mb-1">
                                Monto Recibido <span class="text-red-500">*</span>
                            </label>
                            <input type="number" step="0.01" id="amount-received" class="w-full text-lg rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="0.00">
                        </div>
                        
                        <div id="change-due-container" class="text-center p-4 bg-white rounded-lg border-2 border-green-300 hidden">
                            <p class="text-sm font-medium text-green-800 mb-1">
                                <i data-lucide="coins" class="w-4 h-4 inline mr-1"></i>
                                Vuelto a Entregar
                            </p>
                            <div id="change-due-primary" class="text-3xl font-bold text-green-700"></div>
                            <div id="change-due-secondary" class="text-lg text-gray-600"></div>
                            <div id="denominations-suggestion" class="text-xs text-gray-500 mt-2 hidden"></div>
                        </div>
                    </div>

                    <!-- Campo de notas -->
                    <div>
                        <label for="sale-notes" class="block text-sm font-medium text-gray-700 mb-2">
                            <i data-lucide="message-circle" class="w-4 h-4 inline mr-1"></i>
                            Observaciones (Opcional)
                        </label>
                        <textarea id="sale-notes" class="w-full text-sm rounded-md border-gray-300 shadow-sm" rows="2" placeholder="Notas adicionales sobre la venta..."></textarea>
                    </div>

                    <!-- Botones de acción -->
                    <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button type="button" id="modal-cancel-btn" class="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 flex items-center space-x-2 transition-colors">
                            <i data-lucide="x" class="w-4 h-4"></i>
                            <span>Cancelar</span>
                        </button>
                        <button type="submit" id="confirm-payment-btn" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <i data-lucide="check-circle" class="w-4 h-4"></i>
                            <span>Confirmar Pago</span>
                        </button>
                    </div>
                </form>
            </div>
        `;
        openModal('Procesar Pago', formHTML, 'max-w-2xl');

        // Elementos del modal
        const form = document.getElementById('transaction-form');
        const paymentMethodOptions = document.querySelectorAll('input[name="payment-method"]');
        const referenceContainer = document.getElementById('reference-container');
        const referenceInput = document.getElementById('payment-reference');
        const cashPaymentDetails = document.getElementById('cash-payment-details');
        const amountReceivedInput = document.getElementById('amount-received');
        const changeDueContainer = document.getElementById('change-due-container');
        const changeDuePrimary = document.getElementById('change-due-primary');
        const changeDueSecondary = document.getElementById('change-due-secondary');
        const confirmBtn = document.getElementById('confirm-payment-btn');

        // Aplicar estilos a la opción de pago seleccionada
        const updatePaymentMethodStyles = () => {
            document.querySelectorAll('.payment-method-card').forEach(card => {
                const radio = card.parentElement.querySelector('input[type="radio"]');
                if (radio.checked) {
                    card.classList.add('border-blue-500', 'bg-blue-50');
                    card.classList.remove('border-gray-200');
                } else {
                    card.classList.remove('border-blue-500', 'bg-blue-50');
                    card.classList.add('border-gray-200');
                }
            });
        };

        // Generar botones de monto rápido
        const createQuickAmountButtons = (currency) => {
            const quickButtonsContainer = document.getElementById('quick-amount-buttons');
            if (!quickButtonsContainer) return;

            const amounts = currency === primaryCurrencySymbol 
                ? state.settings.quickAmounts 
                : state.settings.quickAmounts.map(amt => amt * state.exchangeRate);
            
            const targetTotal = currency === primaryCurrencySymbol ? total : totalSecondary;
            
            // Incluir el total exacto y algunos montos mayores
            const allAmounts = [...amounts, Math.ceil(targetTotal), Math.ceil(targetTotal * 1.1), Math.ceil(targetTotal * 1.2)];
            const uniqueAmounts = [...new Set(allAmounts)].sort((a, b) => a - b).slice(0, 6);

            quickButtonsContainer.innerHTML = uniqueAmounts.map(amount => 
                `<button type="button" class="quick-amount-btn px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors" data-amount="${amount}">
                    ${formatCurrency(amount, currency)}
                </button>`
            ).join('');
        };

        // Manejar cambio de método de pago
        const handlePaymentMethodChange = () => {
            const selectedMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
            if (!selectedMethod) return;

            const isCash = selectedMethod.includes('Efectivo');
            const needsReference = ['Pago Móvil', 'Transferencia', 'Punto de Venta', 'Biopago'].includes(selectedMethod);

            cashPaymentDetails.classList.toggle('hidden', !isCash);
            referenceContainer.classList.toggle('hidden', !needsReference);
            
            if (isCash) {
                const currency = selectedMethod.includes(primaryCurrencySymbol) ? primaryCurrencySymbol : secondaryCurrencySymbol;
                createQuickAmountButtons(currency);
            }
            
            // Reset campos
            amountReceivedInput.value = '';
            referenceInput.value = '';
            changeDueContainer.classList.add('hidden');
            validateForm();
            updatePaymentMethodStyles();
        };

        // Calcular vuelto
        const calculateChange = () => {
            const received = parseFloat(amountReceivedInput.value) || 0;
            if (received === 0) {
                changeDueContainer.classList.add('hidden');
                validateForm();
                return;
            }

            const selectedMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
            let changePrimary = 0;
            let changeSecondary = 0;

            if (selectedMethod?.includes(primaryCurrencySymbol)) {
                if (received < total) {
                    changeDueContainer.classList.add('hidden');
                    validateForm();
                    return;
                }
                changePrimary = received - total;
                changeSecondary = changePrimary * state.exchangeRate;
            } else if (selectedMethod?.includes(secondaryCurrencySymbol)) {
                if (received < totalSecondary) {
                    changeDueContainer.classList.add('hidden');
                    validateForm();
                    return;
                }
                changeSecondary = received - totalSecondary;
                changePrimary = changeSecondary / state.exchangeRate;
            }

            changeDuePrimary.textContent = formatCurrency(changePrimary, primaryCurrencySymbol);
            changeDueSecondary.textContent = `≈ ${formatCurrency(changeSecondary, secondaryCurrencySymbol)}`;
            changeDueContainer.classList.remove('hidden');
            validateForm();
        };

        // Validar formulario
        const validateForm = () => {
            const selectedMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
            let isValid = true;

            if (!selectedMethod) {
                isValid = false;
            } else if (selectedMethod.includes('Efectivo')) {
                const received = parseFloat(amountReceivedInput.value) || 0;
                const targetAmount = selectedMethod.includes(primaryCurrencySymbol) ? total : totalSecondary;
                isValid = received >= targetAmount;
            } else if (['Pago Móvil', 'Transferencia', 'Punto de Venta', 'Biopago'].includes(selectedMethod)) {
                isValid = referenceInput.value.trim().length > 0;
            }

            confirmBtn.disabled = !isValid;
        };

        // Event listeners
        paymentMethodOptions.forEach(radio => {
            radio.addEventListener('change', handlePaymentMethodChange);
        });

        amountReceivedInput.addEventListener('input', calculateChange);

        // Event delegation para botones de monto rápido
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-amount-btn')) {
                const amount = parseFloat(e.target.dataset.amount);
                amountReceivedInput.value = amount.toFixed(2);
                calculateChange();
            }
        });

        referenceInput.addEventListener('input', validateForm);

        // Atajos de teclado
        const handleKeyboardShortcuts = (e) => {
            if (e.key === 'Enter' && !confirmBtn.disabled) {
                e.preventDefault();
                form.dispatchEvent(new Event('submit'));
            }
        };

        document.addEventListener('keydown', handleKeyboardShortcuts);

        document.getElementById('modal-cancel-btn').addEventListener('click', () => {
            document.removeEventListener('keydown', handleKeyboardShortcuts);
            closeModal();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            document.removeEventListener('keydown', handleKeyboardShortcuts);
            
            const selectedMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
            
            // Guardar último método de pago usado
            state.settings.lastPaymentMethod = selectedMethod;
            saveState();
            
            completeSale({
                paymentMethod: selectedMethod,
                reference: referenceInput.value.trim() || null,
                customerName: document.getElementById('customer-name').value.trim() || null,
                customerPhone: document.getElementById('customer-phone').value.trim() || null,
                notes: document.getElementById('sale-notes').value.trim() || null
            });
        });

        // Inicialización
        handlePaymentMethodChange();
        validateForm();
    };

    const completeSale = (details) => {
        if (state.currentSale.items.length === 0) {
            showCustomAlert('No hay artículos en el carrito para completar la venta.', 'error');
            return;
        }

        // Verificación final de stock
        const stockCheck = verifyStockAvailability();
        if (!stockCheck.available) {
            showCustomAlert(stockCheck.message, 'error');
            return;
        }

        // Deshabilitar botón para prevenir doble clic
        const confirmBtn = document.getElementById('confirm-payment-btn');
        if (confirmBtn) {
            confirmBtn.disabled = true;
            confirmBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin mr-2"></i>Procesando...';
            lucide.createIcons();
        }

        const saleProfit = state.currentSale.items.reduce((profit, item) => {
            const cost = item.isWeightBased 
                ? (item.purchasePrice || 0) * item.weight 
                : (item.purchasePrice || 0) * item.quantity;
            const revenue = item.isWeightBased ? item.salePrice : item.salePrice * item.quantity;
            return profit + (revenue - cost);
        }, 0);

        const isSecondaryCurrencyPayment = details.paymentMethod.includes(state.settings.secondaryCurrencySymbol) || ['Pago Móvil', 'Transferencia', 'Punto de Venta', 'Biopago'].includes(details.paymentMethod);
        
        const newSale = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: state.currentSale.items,
            subtotal: state.currentSale.subtotal,
            total: isSecondaryCurrencyPayment ? 0 : state.currentSale.total,
            totalSecondary: isSecondaryCurrencyPayment ? state.currentSale.total * state.exchangeRate : 0,
            profit: saleProfit,
            exchangeRate: state.exchangeRate,
            transactionType: 'Venta',
            paymentMethod: details.paymentMethod,
            reference: details.reference,
            customerName: details.customerName,
            customerPhone: details.customerPhone,
            notes: details.notes
        };

        state.sales.push(newSale);
        
        // Deducir cantidades del inventario
        newSale.items.forEach(saleItem => {
            const productInInventory = state.inventory.find(p => p.id === saleItem.id);
            if (productInInventory) {
                if (saleItem.isWeightBased) {
                    productInInventory.quantity -= saleItem.weight;
                } else {
                    productInInventory.quantity -= saleItem.quantity;
                }
            }
        });

        state.currentSale = JSON.parse(JSON.stringify(defaultState.currentSale));
        saveState();
        closeModal();
        renderVenta();
        showCustomAlert('¡Venta completada exitosamente!', 'success');
        
        // Mostrar opción para nueva venta
        setTimeout(() => {
            if (confirm('¿Desea realizar otra venta?')) {
                // Ya estamos en la vista de ventas, solo necesitamos que el foco esté listo
                const searchInput = document.getElementById('product-search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
        }, 1000);
    };

    const cancelSale = async () => {
        if (await showCustomConfirm('¿Estás seguro de que quieres cancelar esta venta? Se perderán todos los artículos del carrito.')) {
            state.currentSale = JSON.parse(JSON.stringify(defaultState.currentSale));
            renderCurrentSale();
            showCustomAlert('Venta cancelada.', 'info');
        }
    };

    const renderSalesReport = () => {
        const mainContent = document.getElementById('main-content');
        // Preserve the background logo
        const backgroundLogo = mainContent.querySelector('img.absolute');
        mainContent.innerHTML = ''; 
        if (backgroundLogo) {
            mainContent.appendChild(backgroundLogo);
        }

        mainContent.insertAdjacentHTML('beforeend', `
            <div id="report-content-to-print" class="relative z-10">
                <div class="flex flex-wrap justify-between items-center mb-4 gap-4">
                    <h2 class="text-2xl font-semibold text-gray-800 w-full sm:w-auto">Reporte General</h2>
                    <div class="flex items-center space-x-2 w-full sm:w-auto flex-wrap" id="report-filters">
                        <input type="date" id="report-date-start" class="rounded-md border-gray-300 shadow-sm">
                        <span class="text-gray-500">a</span>
                        <input type="date" id="report-date-end" class="rounded-md border-gray-300 shadow-sm">
                        <select id="report-type-filter" class="rounded-md border-gray-300 shadow-sm">
                            <option value="Todo">Todo</option><option value="Venta">Ventas</option><option value="Gasto">Gastos</option>
                        </select>
                        <button id="filter-report-btn" class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"><i data-lucide="filter" class="w-5 h-5"></i></button>
                        <button id="reset-report-btn" class="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"><i data-lucide="rotate-cw" class="w-5 h-5"></i></button>
                        <button id="export-pdf-btn" class="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 flex items-center gap-2"><i data-lucide="file-text" class="w-5 h-5"></i></button>
                        <button id="export-report-btn" class="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 flex items-center gap-2"><i data-lucide="sheet" class="w-5 h-5"></i></button>
                    </div>
                </div>
                <div id="report-summary" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"></div>
                <div class="bg-white p-6 rounded-lg shadow-md overflow-x-auto mb-6">
                    <h3 class="text-lg font-semibold mb-4">Detalle de Movimientos del Período</h3>
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción / Producto</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método / Ref.</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                            </tr>
                        </thead>
                        <tbody id="report-table-body" class="bg-white divide-y divide-gray-200"></tbody>
                    </table>
                </div>
            </div>`);
        
        const displayReport = () => {
            const startDateInput = document.getElementById('report-date-start').value;
            const endDateInput = document.getElementById('report-date-end').value;
            const typeFilter = document.getElementById('report-type-filter').value;
            const start = startDateInput || '1970-01-01'; // Default to very old date if no start date
            const end = endDateInput || new Date().toISOString().split('T')[0]; // Default to today if no end date

            const filteredSales = state.sales.filter(s => s.date.split('T')[0] >= start && s.date.split('T')[0] <= end);
            const filteredExpenses = state.expenses.filter(e => e.date.split('T')[0] >= start && e.date.split('T')[0] <= end);

            // Calculations for summary cards
            const totalSalesPrimary = filteredSales.reduce((sum, s) => sum + (s.total || 0), 0);
            const totalSalesSecondary = filteredSales.reduce((sum, s) => sum + (s.totalSecondary || 0), 0);
            const totalExpensesPrimary = filteredExpenses.filter(e => e.currency === state.settings.primaryCurrencySymbol).reduce((sum, e) => sum + e.amount, 0);
            const totalExpensesSecondary = filteredExpenses.filter(e => e.currency === state.settings.secondaryCurrencySymbol).reduce((sum, e) => sum + e.amount, 0);
            const totalUnitsSold = filteredSales.reduce((sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
            
            const totalGrossProfitPrimary = filteredSales.filter(s => s.total > 0).reduce((sum, s) => sum + (s.profit || 0), 0);
            const totalGrossProfitSecondary = filteredSales.filter(s => s.totalSecondary > 0).reduce((sum, s) => sum + (s.profit || 0) * s.exchangeRate, 0);

            const netProfitPrimary = totalGrossProfitPrimary - totalExpensesPrimary;
            const netProfitSecondary = totalGrossProfitSecondary - totalExpensesSecondary;

            // Render Summary Cards
            const summaryContainer = document.getElementById('report-summary');
            summaryContainer.innerHTML = [
                { title: `Ventas (${state.settings.primaryCurrencySymbol})`, value: formatCurrency(totalSalesPrimary, state.settings.primaryCurrencySymbol), icon: 'dollar-sign', color: 'blue' },
                { title: `Ventas (${state.settings.secondaryCurrencySymbol})`, value: formatCurrency(totalSalesSecondary, state.settings.secondaryCurrencySymbol), icon: 'landmark', color: 'indigo' },
                { title: `Gastos (${state.settings.primaryCurrencySymbol})`, value: formatCurrency(totalExpensesPrimary, state.settings.primaryCurrencySymbol), icon: 'arrow-down-circle', color: 'red' },
                { title: `Gastos (${state.settings.secondaryCurrencySymbol})`, value: formatCurrency(totalExpensesSecondary, state.settings.secondaryCurrencySymbol), icon: 'arrow-down-circle', color: 'orange' },
                { title: `Ganancia Neta (${state.settings.primaryCurrencySymbol})`, value: formatCurrency(netProfitPrimary, state.settings.primaryCurrencySymbol), icon: 'wallet', color: 'green' },
                { title: `Ganancia Neta (${state.settings.secondaryCurrencySymbol})`, value: formatCurrency(netProfitSecondary, state.settings.secondaryCurrencySymbol), icon: 'wallet', color: 'teal' },
                { title: 'Total Unidades Vendidas', value: totalUnitsSold, icon: 'package', color: 'purple' },
            ].map(card => `
                <div class="bg-white p-3 rounded-lg shadow-md flex items-center">
                    <div class="p-2 rounded-full bg-${card.color}-100 mr-3"><i data-lucide="${card.icon}" class="text-${card.color}-600"></i></div>
                    <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-500 truncate">${card.title}</p>
                        <p class="text-lg font-bold text-gray-800 truncate">${card.value}</p>
                    </div>
                </div>`).join('');

            // Logic for detailed table
            let unifiedReportData = [];
            filteredSales.forEach(sale => sale.items.forEach(item => {
                const quantityDisplay = item.isWeightBased ? `${item.weight.toFixed(3)} Kg` : item.quantity;
                const amountDisplay = item.isWeightBased ? item.salePrice : item.quantity * item.salePrice;
                unifiedReportData.push({ 
                    date: sale.date, 
                    type: sale.transactionType, 
                    description: item.name, 
                    quantity: quantityDisplay, 
                    method: sale.reference ? `${sale.paymentMethod} (Ref: ${sale.reference})` : sale.paymentMethod, 
                    isSecondary: sale.totalSecondary > 0, 
                    amount: amountDisplay, 
                    exchangeRate: sale.exchangeRate, 
                    isExpense: false 
                });
            }));
            filteredExpenses.forEach(expense => unifiedReportData.push({ date: expense.date, type: 'Gasto', description: expense.description, quantity: '-', method: expense.reference ? `${expense.paymentMethod} (Ref: ${expense.reference})` : (expense.paymentMethod || '-'), isSecondary: expense.currency === state.settings.secondaryCurrencySymbol, amount: expense.amount, currencySymbol: expense.currency, isExpense: true }));
            
            const finalData = typeFilter === 'Todo' ? unifiedReportData : unifiedReportData.filter(item => item.type === typeFilter);
            
            const reportTableBody = document.getElementById('report-table-body');
            reportTableBody.innerHTML = finalData.length === 0 
                ? `<tr><td colspan="6" class="text-center py-4">No hay movimientos para mostrar.</td></tr>`
                : finalData.sort((a,b) => new Date(b.date) - new Date(a.date)).map(item => {
                    const amount = item.isSecondary 
                        ? formatCurrency(item.isExpense ? item.amount : item.amount * item.exchangeRate, item.currencySymbol || state.settings.secondaryCurrencySymbol) 
                        : formatCurrency(item.amount, item.currencySymbol || state.settings.primaryCurrencySymbol);
                    return `<tr class="${item.isExpense ? 'bg-red-50' : ''}">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(item.date)}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.type}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.description}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.quantity}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.method}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold ${item.isExpense ? 'text-red-600' : 'text-gray-900'}">${amount}</td>
                        </tr>`;
                }).join('');
            
            lucide.createIcons();
        };
        
        displayReport();
        document.getElementById('filter-report-btn').addEventListener('click', displayReport);
        document.getElementById('reset-report-btn').addEventListener('click', () => {
            document.getElementById('report-date-start').value = '';
            document.getElementById('report-date-end').value = '';
            document.getElementById('report-type-filter').value = 'Todo';
            displayReport();
        });
        document.getElementById('export-pdf-btn').addEventListener('click', () => exportPDF());
        document.getElementById('export-report-btn').addEventListener('click', () => exportReport());
    };

    const exportPDF = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const reportTypeFilterEl = document.getElementById('report-type-filter');
        const reportTitleText = reportTypeFilterEl.options[reportTypeFilterEl.selectedIndex].text;
        const startDateInput = document.getElementById('report-date-start').value;
        const endDateInput = document.getElementById('report-date-end').value;
        const date = new Date().toISOString().split('T')[0];
        const filename = `reporte_${reportTitleText}_${date}.pdf`;

        const title = `Reporte de ${reportTitleText}`;
        const dateRange = `Desde: ${startDateInput ? formatDate(startDateInput) : 'Inicio'} - Hasta: ${endDateInput ? formatDate(endDateInput) : 'Hoy'}`;

        const headers = [["Fecha", "Tipo", "Descripcion", "Cantidad", "Metodo de Pago", "Monto", "Moneda"]];
        const dataForSheet = getReportDataForExport();

        if (dataForSheet.length === 0) {
            showCustomAlert('No hay datos para exportar.', 'error');
            return;
        }

        // --- Calculation for summary ---
        const start = startDateInput || '1970-01-01';
        const end = endDateInput || new Date().toISOString().split('T')[0];
        const filteredSales = state.sales.filter(s => s.date.split('T')[0] >= start && s.date.split('T')[0] <= end);
        const filteredExpenses = state.expenses.filter(e => e.date.split('T')[0] >= start && e.date.split('T')[0] <= end);
        const totalSalesPrimary = filteredSales.reduce((sum, s) => sum + (s.total || 0), 0);
        const totalSalesSecondary = filteredSales.reduce((sum, s) => sum + (s.totalSecondary || 0), 0);
        const totalExpensesPrimary = filteredExpenses.filter(e => e.currency === state.settings.primaryCurrencySymbol).reduce((sum, e) => sum + e.amount, 0);
        const totalExpensesSecondary = filteredExpenses.filter(e => e.currency === state.settings.secondaryCurrencySymbol).reduce((sum, e) => sum + e.amount, 0);
        // --- End of summary calculation ---

        const body = dataForSheet.map(Object.values);

        doc.setFontSize(18);
        doc.text(title, 14, 22);
        doc.setFontSize(11);
        doc.text(dateRange, 14, 29);

        // --- Add summary table to the top right ---
        const summaryBody = [];
        const reportType = reportTypeFilterEl.value;

        if (reportType === 'Venta' || reportType === 'Todo') {
            summaryBody.push(['Ventas ($)', formatCurrency(totalSalesPrimary, state.settings.primaryCurrencySymbol)]);
            summaryBody.push(['Ventas (Bs)', formatCurrency(totalSalesSecondary, state.settings.secondaryCurrencySymbol)]);
        }
        if (reportType === 'Gasto' || reportType === 'Todo') {
            summaryBody.push(['Gastos ($)', formatCurrency(totalExpensesPrimary, state.settings.primaryCurrencySymbol)]);
            summaryBody.push(['Gastos (Bs)', formatCurrency(totalExpensesSecondary, state.settings.secondaryCurrencySymbol)]);
        }
        
        doc.autoTable({
            body: summaryBody,
            startY: 15, // Start higher to be in the top right
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 1.5 },
            columnStyles: { 0: { fontStyle: 'bold' } },
            margin: { left: doc.internal.pageSize.getWidth() / 2 + 10 } // Push to right side
        });

        doc.autoTable({
            head: headers,
            body: body,
            startY: doc.autoTable.previous.finalY + 10, // Start after the summary table
            headStyles: { fillColor: [22, 160, 133] },
            styles: { fontSize: 8 },
        });

        doc.save(filename);
    };
    
    const getReportDataForExport = () => {
        const startDateInput = document.getElementById('report-date-start').value;
        const endDateInput = document.getElementById('report-date-end').value;
        const typeFilter = document.getElementById('report-type-filter').value;
        const start = startDateInput || '1970-01-01';
        const end = endDateInput || new Date().toISOString().split('T')[0];

        const filteredSales = state.sales.filter(s => s.date.split('T')[0] >= start && s.date.split('T')[0] <= end);
        const filteredExpenses = state.expenses.filter(e => e.date.split('T')[0] >= start && e.date.split('T')[0] <= end);

        let unifiedReportData = [];
        filteredSales.forEach(sale => sale.items.forEach(item => {
            const quantityDisplay = item.isWeightBased ? `${item.weight.toFixed(3)} Kg` : item.quantity;
            const amountDisplay = item.isWeightBased ? item.salePrice : item.quantity * item.salePrice;
            unifiedReportData.push({ 
                date: sale.date, 
                type: sale.transactionType, 
                description: item.name, 
                quantity: quantityDisplay, 
                method: sale.reference ? `${sale.paymentMethod} (Ref: ${sale.reference})` : sale.paymentMethod, 
                isSecondary: sale.totalSecondary > 0, 
                amount: amountDisplay, 
                exchangeRate: sale.exchangeRate, 
                isExpense: false 
            });
        }));
        filteredExpenses.forEach(expense => unifiedReportData.push({ date: expense.date, type: 'Gasto', description: expense.description, quantity: '-', method: expense.reference ? `${expense.paymentMethod} (Ref: ${expense.reference})` : (expense.paymentMethod || '-'), isSecondary: expense.currency === state.settings.secondaryCurrencySymbol, amount: expense.amount, currencySymbol: expense.currency, isExpense: true }));
        
        const data = typeFilter === 'Todo' ? unifiedReportData : unifiedReportData.filter(item => item.type === typeFilter);
        
        return data.sort((a,b) => new Date(b.date) - new Date(a.date)).map(item => ({
            "Fecha": formatDate(item.date),
            "Tipo": item.type,
            "Descripcion": item.description,
            "Cantidad": item.quantity,
            "Metodo de Pago": item.method,
            "Monto": parseFloat((item.isSecondary ? (item.isExpense ? item.amount : item.amount * item.exchangeRate) : item.amount).toFixed(2)),
            "Moneda": item.isSecondary ? (item.currencySymbol || state.settings.secondaryCurrencySymbol) : (item.currencySymbol || state.settings.primaryCurrencySymbol)
        }));
    };

    const exportReport = () => {
        const reportTypeFilterEl = document.getElementById('report-type-filter');
        const reportTitleText = reportTypeFilterEl.options[reportTypeFilterEl.selectedIndex].text;
        const startDateInput = document.getElementById('report-date-start').value;
        const endDateInput = document.getElementById('report-date-end').value;
        
        const title = `Reporte de ${reportTitleText}`;
        const dateRange = `Desde: ${startDateInput ? formatDate(startDateInput) : 'Inicio'} - Hasta: ${endDateInput ? formatDate(endDateInput) : 'Hoy'}`;

        const headers = ["Fecha", "Tipo", "Descripcion", "Cantidad", "Metodo de Pago", "Monto", "Moneda"];
        const dataForSheet = getReportDataForExport();

        if (dataForSheet.length === 0) {
            showCustomAlert('No hay datos para exportar.', 'error');
            return;
        }
        
        const finalData = [
            [title, null, null, null, null, null, null],
            [dateRange, null, null, null, null, null, null],
            [], // Empty row for spacing
            headers,
            ...dataForSheet.map(Object.values)
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(finalData);

        // Auto-fit columns
        const colWidths = headers.map((_, i) => ({
            wch: finalData.reduce((w, r) => Math.max(w, r[i] ? r[i].toString().length : 0), 10)
        }));
        worksheet['!cols'] = colWidths;

        // Merge title and date range cells
        worksheet['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } },
            { s: { r: 1, c: 0 }, e: { r: 1, c: headers.length - 1 } }
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");
        XLSX.writeFile(workbook, `reporte_${reportTitleText}_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const renderExpenses = () => {
        const mainContent = document.getElementById('main-content');
        // Preserve the background logo
        const backgroundLogo = mainContent.querySelector('img.absolute');
        mainContent.innerHTML = ''; 
        if (backgroundLogo) {
            mainContent.appendChild(backgroundLogo);
        }

        mainContent.insertAdjacentHTML('beforeend', `
            <div class="flex justify-between items-center mb-6 relative z-10">
                <h2 class="text-2xl font-semibold text-gray-800">Gestión de Gastos</h2>
                <button id="add-expense-btn" class="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 flex items-center space-x-2"><i data-lucide="plus-circle"></i><span>Añadir Gasto</span></button>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md overflow-x-auto relative z-10">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método de Pago</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="expenses-table-body" class="bg-white divide-y divide-gray-200"></tbody>
                </table>
            </div>`);
        
        const tableBody = document.getElementById('expenses-table-body');
        tableBody.innerHTML = state.expenses.length === 0
            ? `<tr><td colspan="5" class="text-center py-4">No hay gastos registrados.</td></tr>`
            : state.expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(expense => `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">${expense.description}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${formatCurrency(expense.amount, expense.currency)}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${expense.paymentMethod || '-'}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${formatDate(expense.date)}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button class="delete-expense-btn text-red-600 hover:text-red-900" data-id="${expense.id}"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
                    </td>
                </tr>`).join('');
        
        document.getElementById('add-expense-btn').addEventListener('click', showExpenseForm);
        tableBody.addEventListener('click', async e => {
            const deleteBtn = e.target.closest('.delete-expense-btn');
            if (deleteBtn && await showCustomConfirm('¿Estás seguro de que quieres eliminar este gasto? Esta acción es irreversible.')) {
                state.expenses = state.expenses.filter(exp => exp.id !== parseInt(deleteBtn.dataset.id));
                saveState();
                renderExpenses();
                showCustomAlert('Gasto eliminado correctamente.', 'success');
            }
        });
        lucide.createIcons();
    };

    const showExpenseForm = () => {
        const { primaryCurrencySymbol, secondaryCurrencySymbol } = state.settings;
        const formHTML = `
            <form id="expense-form">
                <div class="mb-4">
                    <label for="expense-description" class="block text-sm font-medium text-gray-700">Descripción</label>
                    <input type="text" id="expense-description" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                </div>
                <div class="mb-4">
                    <label for="expense-amount" class="block text-sm font-medium text-gray-700">Monto Total del Gasto</label>
                    <input type="number" step="0.01" id="expense-amount" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                </div>
                <div class="mb-4">
                    <label for="expense-currency" class="block text-sm font-medium text-gray-700">Moneda</label>
                    <select id="expense-currency" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="${primaryCurrencySymbol}">${primaryCurrencySymbol}</option>
                        <option value="${secondaryCurrencySymbol}">${secondaryCurrencySymbol}</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="expense-payment-method" class="block text-sm font-medium text-gray-700">Método de Pago</label>
                    <select id="expense-payment-method" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="Efectivo (${state.settings.secondaryCurrencySymbol})">Efectivo (${state.settings.secondaryCurrencySymbol})</option>
                        <option value="Efectivo (${state.settings.primaryCurrencySymbol})">Efectivo (${state.settings.primaryCurrencySymbol})</option>
                        <option value="Pago Móvil">Pago Móvil</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Punto de Venta">Punto de Venta</option>
                        <option value="Biopago">Biopago</option>
                    </select>
                </div>
                <div id="expense-reference-container" class="mb-4 hidden">
                    <label for="expense-payment-reference" class="block text-sm font-medium text-gray-700">Referencia</label>
                    <input type="text" id="expense-payment-reference" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                </div>
                <div class="flex items-center mb-4">
                    <input id="is-inventory-purchase" type="checkbox" class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                    <label for="is-inventory-purchase" class="ml-2 block text-sm text-gray-900">¿Es una compra para el inventario?</label>
                </div>
                <div id="inventory-purchase-container" class="hidden space-y-4 p-4 border bg-gray-50 rounded-md mb-4">
                    <div>
                        <label for="expense-product-select" class="block text-sm font-medium text-gray-700">Producto</label>
                        <select id="expense-product-select" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            <option value="">Seleccione un producto...</option>
                            ${state.inventory.map(p => `<option value="${p.id}">${p.name} (${p.barcode || 'Sin código'})</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label for="expense-quantity-purchased" class="block text-sm font-medium text-gray-700">Cantidad Comprada</label>
                        <input type="number" id="expense-quantity-purchased" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" min="1">
                    </div>
                </div>
                <div class="text-right">
                    <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Guardar Gasto</button>
                </div>
            </form>`;
        openModal('Añadir Gasto', formHTML, 'max-w-md');
        
        const paymentMethodSelect = document.getElementById('expense-payment-method');
        const referenceContainer = document.getElementById('expense-reference-container');
        const isInventoryCheckbox = document.getElementById('is-inventory-purchase');
        const inventoryContainer = document.getElementById('inventory-purchase-container');
        const productSelect = document.getElementById('expense-product-select');
        const descriptionInput = document.getElementById('expense-description');
        
        isInventoryCheckbox.addEventListener('change', () => {
            inventoryContainer.classList.toggle('hidden', !isInventoryCheckbox.checked);
            if (!isInventoryCheckbox.checked) {
                descriptionInput.value = ''; // Clear description if unchecked
            } else {
                productSelect.dispatchEvent(new Event('change')); // Trigger change to pre-fill description
            }
        });

        productSelect.addEventListener('change', () => {
            if (isInventoryCheckbox.checked && productSelect.value) {
                const selectedProduct = state.inventory.find(p => p.id == productSelect.value);
                if (selectedProduct) {
                    descriptionInput.value = `Compra de inventario: ${selectedProduct.name}`;
                }
            }
        });

        const toggleReferenceField = () => {
            const selectedMethod = paymentMethodSelect.value;
            referenceContainer.classList.toggle('hidden', !['Pago Móvil', 'Transferencia', 'Punto de Venta', 'Biopago'].includes(selectedMethod));
        };
        paymentMethodSelect.addEventListener('change', toggleReferenceField);
        toggleReferenceField(); // Call initially to set correct state

        document.getElementById('expense-form').addEventListener('submit', e => {
            e.preventDefault();
            
            const isInventoryPurchase = document.getElementById('is-inventory-purchase').checked;
            
            if (isInventoryPurchase) {
                const productId = document.getElementById('expense-product-select').value;
                const quantityPurchased = parseInt(document.getElementById('expense-quantity-purchased').value);

                if (!productId || !quantityPurchased || quantityPurchased <= 0) {
                    showCustomAlert('Por favor, seleccione un producto y una cantidad válida para la compra de inventario.', 'error');
                    return;
                }

                const productIndex = state.inventory.findIndex(p => p.id == productId);
                if (productIndex > -1) {
                    state.inventory[productIndex].quantity += quantityPurchased;
                } else {
                    showCustomAlert('Producto no encontrado en el inventario.', 'error');
                    return; // Should not happen if product is from dropdown
                }
            }

            const newExpense = {
                id: Date.now(),
                description: document.getElementById('expense-description').value,
                amount: parseFloat(document.getElementById('expense-amount').value),
                currency: document.getElementById('expense-currency').value,
                paymentMethod: document.getElementById('expense-payment-method').value,
                reference: document.getElementById('expense-payment-reference').value || null,
                date: new Date().toISOString()
            };

            state.expenses.push(newExpense);
            saveState();
            renderExpenses();
            closeModal();
            showCustomAlert('Gasto registrado y stock actualizado.', 'success');
        });
    };

    const renderPriceList = () => {
        const mainContent = document.getElementById('main-content');
        // Preserve the background logo
        const backgroundLogo = mainContent.querySelector('img.absolute');
        mainContent.innerHTML = ''; 
        if (backgroundLogo) {
            mainContent.appendChild(backgroundLogo);
        }

        mainContent.insertAdjacentHTML('beforeend', `
            <div class="flex flex-wrap justify-between items-center mb-6 gap-4 relative z-10">
                <h2 class="text-2xl font-semibold text-gray-800">Lista de Precios</h2>
                <div class="flex items-center space-x-2">
                    <select id="price-list-category-filter" class="rounded-md border-gray-300 shadow-sm">
                        <option value="all">Todas las categorías</option>
                        ${state.settings.categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                    </select>
                    <button id="export-price-list-pdf-btn" class="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 flex items-center gap-2">
                        <i data-lucide="file-text" class="w-5 h-5"></i>
                        <span>Exportar PDF</span>
                    </button>
                    <button id="print-product-cards-btn" class="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
                        <i data-lucide="printer" class="w-5 h-5"></i>
                        <span>Imprimir Cuadros</span>
                    </button>
                </div>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md overflow-x-auto relative z-10">
                <div class="mb-4 text-lg">Dolar BCV: <span class="font-bold text-blue-600">${state.exchangeRate.toFixed(2)} ${state.settings.secondaryCurrencySymbol} Tasa del Dia</span></div>
                <div id="price-list-container"></div>
            </div>`);

        const priceListContainer = document.getElementById('price-list-container');
        const categoryFilterSelect = document.getElementById('price-list-category-filter');

        const renderFilteredPriceList = () => {
            const selectedCategory = categoryFilterSelect.value;
            const groupedProducts = state.inventory.reduce((acc, product) => {
                const category = product.category || 'Sin Categoría';
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(product);
                return acc;
            }, {});

            const categoriesToDisplay = selectedCategory === 'all' 
                ? Object.keys(groupedProducts).sort() 
                : (groupedProducts[selectedCategory] ? [selectedCategory] : []);

            priceListContainer.innerHTML = categoriesToDisplay.map(category => {
                const products = groupedProducts[category].sort((a, b) => a.name.localeCompare(b.name));
                return `
                    <h3 class="text-xl font-semibold mt-6 mb-3 border-b pb-2">${category}</h3>
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio (${state.settings.primaryCurrencySymbol})</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio (${state.settings.secondaryCurrencySymbol})</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${products.map(product => `
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap">${product.name}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">${formatCurrency(product.salePrice, state.settings.primaryCurrencySymbol)} ${product.soldByWeight ? '/ Kg' : ''}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">${formatCurrency(product.salePrice * state.exchangeRate, state.settings.secondaryCurrencySymbol)} ${product.soldByWeight ? '/ Kg' : ''}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            }).join('');
        };

        renderFilteredPriceList();
        categoryFilterSelect.addEventListener('change', renderFilteredPriceList);
        document.getElementById('export-price-list-pdf-btn').addEventListener('click', exportPriceListPDF);
        document.getElementById('print-product-cards-btn').addEventListener('click', showPrintableProductCards); // New event listener
        lucide.createIcons();
    };

    const exportPriceListPDF = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const categoryFilter = document.getElementById('price-list-category-filter').value;

        const groupedProducts = state.inventory.reduce((acc, product) => {
            const category = product.category || 'Sin Categoría';
            if (!acc[category]) acc[category] = [];
            acc[category].push(product);
            return acc;
        }, {});

        const sortedCategories = Object.keys(groupedProducts).sort();
        
        doc.setFontSize(18);
        doc.text(state.settings.companyName, 14, 22);
        doc.setFontSize(12);
        doc.text(`Lista de Precios - ${formatDate(new Date().toISOString())}`, 14, 29);
        doc.setFontSize(10);
        doc.text(`Tasa: ${state.exchangeRate.toFixed(2)} ${state.settings.secondaryCurrencySymbol}`, 14, 35);

        let finalY = 35;

        const categoriesToExport = categoryFilter === 'all' ? sortedCategories : [categoryFilter];

        categoriesToExport.forEach(category => {
            if (!groupedProducts[category]) return;

            const products = groupedProducts[category].sort((a, b) => a.name.localeCompare(b.name));
            const head = [['Producto', `Precio (${state.settings.primaryCurrencySymbol})`, `Precio (${state.settings.secondaryCurrencySymbol})`]];
            const body = products.map(p => [
                p.name,
                `${formatCurrency(p.salePrice, state.settings.primaryCurrencySymbol)} ${p.soldByWeight ? '/ Kg' : ''}`,
                `${formatCurrency(p.salePrice * state.exchangeRate, state.settings.secondaryCurrencySymbol)} ${p.soldByWeight ? '/ Kg' : ''}`
            ]);

            // Add category header table
            doc.autoTable({
                startY: finalY + 10,
                head: [[{ content: category, colSpan: 3, styles: { fillColor: [230, 230, 230], textColor: 20, fontStyle: 'bold' } }]],
                theme: 'grid'
            });

            // Add products table for the category
            doc.autoTable({
                startY: doc.autoTable.previous.finalY, // Continue from the category header
                head: head,
                body: body,
                theme: 'grid',
                headStyles: { fillColor: [22, 160, 133] }, // Example header color
            });
            finalY = doc.autoTable.previous.finalY; // Update finalY for next category
        });

        doc.save(`lista_de_precios_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    // New function to show printable product cards
    const showPrintableProductCards = () => {
        const selectedCategory = document.getElementById('price-list-category-filter').value;
        const productsToPrint = selectedCategory === 'all' 
            ? state.inventory 
            : state.inventory.filter(p => p.category === selectedCategory);

        if (productsToPrint.length === 0) {
            showCustomAlert('No hay productos para imprimir en la categoría seleccionada.', 'info');
            return;
        }

        const productCardsHTML = productsToPrint.map(product => `
            <div class="product-print-card border border-gray-300 rounded-lg p-3 text-center shadow-sm break-inside-avoid" style="width: calc(33.33% - 1rem); margin-bottom: 1rem;">
                <h4 class="font-semibold text-lg mb-1">${product.name}</h4>
                <p class="text-sm text-gray-600 mb-1">Código: ${product.barcode || 'N/A'}</p>
                <p class="text-xl font-bold text-blue-600">${formatCurrency(product.salePrice, state.settings.primaryCurrencySymbol)} ${product.soldByWeight ? '/ Kg' : ''}</p>
            </div>
        `).join('');

        const modalContent = `
            <style>
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-content, #printable-content * {
                        visibility: visible;
                    }
                    #printable-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    /* Ensure cards break gracefully */
                    .product-print-card {
                        page-break-inside: avoid;
                    }
                }
            </style>
            <div class="flex justify-end mb-4">
                <button id="print-now-btn" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                    <i data-lucide="printer"></i>
                    <span>Imprimir Ahora</span>
                </button>
            </div>
            <div id="printable-content" class="flex flex-wrap gap-4 justify-center">
                ${productCardsHTML}
            </div>
        `;
        openModal('Imprimir Lista de Precios en Cuadros', modalContent, 'max-w-4xl');

        document.getElementById('print-now-btn').addEventListener('click', printProductCards);
    };

    // New function to handle printing
    const printProductCards = () => {
        const content = document.getElementById('printable-content').innerHTML;
        const originalBody = document.body.innerHTML;

        // Temporarily replace body content with printable content
        document.body.innerHTML = `
            <html>
            <head>
                <title>Lista de Precios</title>
                <link rel="stylesheet" href="https://cdn.tailwindcss.com">
                <style>
                    body { font-family: 'Inter', sans-serif; margin: 0; padding: 1rem; }
                    .product-print-card {
                        border: 1px solid #ccc;
                        padding: 0.75rem;
                        text-align: center;
                        border-radius: 0.5rem;
                        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
                        display: inline-block; /* For better print layout */
                        width: calc(33.33% - 1rem); /* Approx 3 per row */
                        vertical-align: top; /* Align top for multi-line names */
                        margin: 0.5rem; /* Spacing between cards */
                    }
                    @media print {
                        .product-print-card {
                            width: calc(33.33% - 1rem); /* 3 cards per row */
                            margin: 0.25rem;
                            page-break-inside: avoid; /* Keep card on one page */
                        }
                    }
                </style>
            </head>
            <body>
                <h1 style="text-align: center; font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Lista de Precios - ${state.settings.companyName}</h1>
                <p style="text-align: center; font-size: 0.9rem; margin-bottom: 1rem;">Tasa del Día: ${state.exchangeRate.toFixed(2)} ${state.settings.secondaryCurrencySymbol}</p>
                <div style="display: flex; flex-wrap: wrap; justify-content: center;">
                    ${content}
                </div>
            </body>
            </html>
        `;
        
        window.print();
        closeModal(); // Close the modal after triggering print

        // Restore original body content after printing (with a slight delay)
        setTimeout(() => {
            document.body.innerHTML = originalBody;
            lucide.createIcons(); // Re-create icons after restoring HTML
            // Re-render the price list to ensure event listeners are reattached
            renderPriceList();
        }, 500); // Small delay to ensure print dialog is shown before content is replaced
    };

    const renderTasa = () => {
        const mainContent = document.getElementById('main-content');
        // Preserve the background logo
        const backgroundLogo = mainContent.querySelector('img.absolute');
        mainContent.innerHTML = ''; 
        if (backgroundLogo) {
            mainContent.appendChild(backgroundLogo);
        }

        mainContent.insertAdjacentHTML('beforeend', `
            <h2 class="text-2xl font-semibold text-gray-800 mb-6 relative z-10">Configurar Tasa del Día</h2>
            <div class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto relative z-10">
                <div class="mb-4">
                    <label for="tasa-input" class="block text-sm font-medium text-gray-700">Tasa de Cambio (${state.settings.secondaryCurrencySymbol} por 1 ${state.settings.primaryCurrencySymbol})</label>
                    <input type="number" id="tasa-input" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ej: 36.50" value="${state.exchangeRate}">
                </div>
                <div class="flex gap-4">
                    <button id="save-tasa-btn" class="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700">Guardar Manual</button>
                    <button id="update-bcv-btn" class="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 flex items-center justify-center gap-2">
                        <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                        <span>Actualizar BCV</span>
                    </button>
                </div>
                <p class="mt-4 text-center">Tasa actual: <strong id="current-tasa" class="text-xl">${state.exchangeRate.toFixed(2)}</strong></p>
            </div>`);
        
        lucide.createIcons();

        document.getElementById('save-tasa-btn').addEventListener('click', () => {
            const newTasa = parseFloat(document.getElementById('tasa-input').value);
            if (!isNaN(newTasa) && newTasa > 0) {
                state.exchangeRate = newTasa;
                saveState();
                renderTasa(); // Re-render to show updated rate
                showCustomAlert('Tasa actualizada correctamente.', 'success');
            } else {
                showCustomAlert('Por favor, introduce un valor válido para la tasa.', 'error');
            }
        });

        document.getElementById('update-bcv-btn').addEventListener('click', () => {
            // This is a simulation. Live data extraction (scraping) from client-side is blocked
            // by browser's CORS policy. For this to work in a real product,
            // a small intermediary server (proxy/backend) would be needed to fetch BCV data
            // and then the application would query that server.
            showCustomAlert('Función no disponible: La actualización automática desde el BCV no es posible por restricciones de seguridad del navegador. Por favor, actualice la tasa manualmente.', 'info');
        });
    };

    const renderConfiguraciones = () => {
        const mainContent = document.getElementById('main-content');
        // Preserve the background logo
        const backgroundLogo = mainContent.querySelector('img.absolute');
        mainContent.innerHTML = ''; 
        if (backgroundLogo) {
            mainContent.appendChild(backgroundLogo);
        }

        mainContent.insertAdjacentHTML('beforeend', `
            <h2 class="text-2xl font-semibold text-gray-800 mb-6 relative z-10">Configuraciones Generales</h2>
            <div class="space-y-8 relative z-10">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold border-b pb-2 mb-4">Datos de la Empresa</h3>
                    <form id="company-form" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="company-name" class="block text-sm font-medium text-gray-700">Nombre</label>
                            <input type="text" id="company-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="${state.settings.companyName}">
                        </div>
                        <div>
                            <label for="company-rif" class="block text-sm font-medium text-gray-700">RIF</label>
                            <input type="text" id="company-rif" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="${state.settings.companyRif || ''}" placeholder="J-12345678-9">
                        </div>
                        <div class="md:col-span-2">
                            <label for="company-phone" class="block text-sm font-medium text-gray-700">Teléfono</label>
                            <input type="text" id="company-phone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="${state.settings.companyPhone}">
                        </div>
                        <div class="md:col-span-2">
                            <label for="company-address" class="block text-sm font-medium text-gray-700">Dirección</label>
                            <input type="text" id="company-address" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="${state.settings.companyAddress}">
                        </div>
                        <div class="md:col-span-2 text-right">
                            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Guardar Datos</button>
                        </div>
                    </form>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold border-b pb-2 mb-4">Símbolos de Moneda</h3>
                    <form id="currency-symbols-form" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="primary-currency-symbol" class="block text-sm font-medium text-gray-700">Símbolo Moneda Principal</label>
                            <input type="text" id="primary-currency-symbol" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="${state.settings.primaryCurrencySymbol}">
                        </div>
                        <div>
                            <label for="secondary-currency-symbol" class="block text-sm font-medium text-gray-700">Símbolo Moneda Secundaria</label>
                            <input type="text" id="secondary-currency-symbol" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="${state.settings.secondaryCurrencySymbol}">
                        </div>
                        <div class="md:col-span-2 text-right">
                            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Guardar Símbolos</button>
                        </div>
                    </form>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="flex justify-between items-center border-b pb-2 mb-4">
                        <h3 class="text-lg font-semibold">Gestión de Categorías</h3>
                        <button id="add-category-btn" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center space-x-2"><i data-lucide="plus"></i><span>Añadir</span></button>
                    </div>
                    <div id="category-list" class="space-y-2"></div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-lg font-semibold border-b pb-2 mb-4">Gestión de Datos</h3>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <button id="export-data-btn" class="w-full flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                            <i data-lucide="download"></i><span>Exportar Datos</span>
                        </button>
                        <button id="import-data-btn" class="w-full flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2">
                            <i data-lucide="upload"></i><span>Importar Datos</span>
                        </button>
                        <input type="file" id="import-file-input" class="hidden" accept=".json">
                    </div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="flex justify-between items-center border-b pb-2 mb-4">
                        <h3 class="text-lg font-semibold">Gestión de Usuarios</h3>
                        <button id="add-user-btn" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 flex items-center space-x-2"><i data-lucide="plus"></i><span>Añadir Usuario</span></button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th></tr></thead>
                            <tbody id="users-table-body" class="bg-white divide-y divide-gray-200"></tbody>
                        </table>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md border border-red-300">
                    <h3 class="text-lg font-semibold text-red-700">Zona de Peligro</h3>
                    <p class="text-sm text-gray-600 my-2">Esto borrará permanentemente todos sus datos (productos, ventas, gastos, etc.). Esta acción no se puede deshacer.</p>
                    <button type="button" id="delete-all-data-btn" class="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800">Borrar Todos los Datos</button>
                </div>
            </div>`);
        
        renderUsers();
        renderCategoriesInSettings();

        document.getElementById('company-form').addEventListener('submit', e => {
            e.preventDefault();
            state.settings.companyName = document.getElementById('company-name').value;
            state.settings.companyRif = document.getElementById('company-rif').value;
            state.settings.companyAddress = document.getElementById('company-address').value;
            state.settings.companyPhone = document.getElementById('company-phone').value;
            saveState();
            showCustomAlert('Datos de la empresa guardados.', 'success');
            document.getElementById('sidebar-company-name').textContent = state.settings.companyName; // Update sidebar name immediately
        });

        document.getElementById('currency-symbols-form').addEventListener('submit', e => {
            e.preventDefault();
            state.settings.primaryCurrencySymbol = document.getElementById('primary-currency-symbol').value;
            state.settings.secondaryCurrencySymbol = document.getElementById('secondary-currency-symbol').value;
            saveState();
            showCustomAlert('Símbolos de moneda guardados.', 'success');
            // Re-render current view to reflect changes if needed, or just rely on next render
            handleNavigation(); // Re-render current page to update currency symbols
        });

        document.getElementById('add-user-btn').addEventListener('click', () => showUserForm());
        document.getElementById('add-category-btn').addEventListener('click', () => showCategoryForm());
        
        document.getElementById('category-list').addEventListener('click', async (e) => {
            const editBtn = e.target.closest('.edit-category-btn');
            if (editBtn) {
                showCategoryForm(editBtn.dataset.category);
            }
            const deleteBtn = e.target.closest('.delete-category-btn');
            if (deleteBtn) {
                const categoryToDelete = deleteBtn.dataset.category;
                if (await showCustomConfirm(`¿Seguro que quieres eliminar la categoría "${categoryToDelete}"? Los productos en esta categoría serán movidos a "Sin Categoría". Esta acción es irreversible.`)) {
                    // Reassign products to "Sin Categoría"
                    state.inventory.forEach(product => {
                        if (product.category === categoryToDelete) {
                            product.category = 'Sin Categoría';
                        }
                    });
                    // Delete category from settings
                    state.settings.categories = state.settings.categories.filter(c => c !== categoryToDelete);
                    saveState();
                    renderCategoriesInSettings();
                    showCustomAlert('Categoría eliminada.', 'success');
                }
            }
        });

        document.getElementById('users-table-body').addEventListener('click', async e => {
            const editBtn = e.target.closest('.edit-user-btn');
            if (editBtn) {
                const user = state.users.find(u => u.id === parseInt(editBtn.dataset.id));
                showUserForm(user);
            }
            const deleteBtn = e.target.closest('.delete-user-btn');
            if (deleteBtn) {
                if (state.users.length === 1) {
                    showCustomAlert('No se puede eliminar al único usuario.', 'error');
                    return;
                }
                if (await showCustomConfirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.')) {
                    state.users = state.users.filter(u => u.id !== parseInt(deleteBtn.dataset.id));
                    saveState();
                    renderUsers();
                    showCustomAlert('Usuario eliminado correctamente.', 'success');
                }
            }
        });

        document.getElementById('delete-all-data-btn').addEventListener('click', async () => {
            if (await showCustomConfirm('ADVERTENCIA: ¿Estás absolutamente seguro de que quieres borrar TODOS los datos?')) {
                if (await showCustomConfirm('Esta acción es irreversible. ¿Confirmas que quieres borrar todo?')) {
                    localStorage.removeItem('miniMarketSysState');
                    showCustomAlert('Todos los datos han sido borrados. La aplicación se recargará.', 'info');
                    setTimeout(() => window.location.reload(), 2000);
                }
            }
        });

        // Listeners for Import/Export
        document.getElementById('export-data-btn').addEventListener('click', exportData);
        const importFileInput = document.getElementById('import-file-input');
        document.getElementById('import-data-btn').addEventListener('click', () => importFileInput.click()); // Trigger file input click
        importFileInput.addEventListener('change', importData);
        lucide.createIcons();
    };

    const renderCategoriesInSettings = () => {
        const categoryList = document.getElementById('category-list');
        if (!categoryList) return; // Ensure element exists before manipulating
        categoryList.innerHTML = state.settings.categories.map(cat => `
            <div class="flex justify-between items-center p-2 rounded-md hover:bg-gray-100">
                <span>${cat}</span>
                ${cat !== 'Sin Categoría' ? `
                <div class="space-x-2">
                    <button class="edit-category-btn text-indigo-600 hover:text-indigo-900" data-category="${cat}"><i data-lucide="edit" class="w-5 h-5"></i></button>
                    <button class="delete-category-btn text-red-600 hover:text-red-900" data-category="${cat}"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
                </div>
                ` : ''}
            </div>
        `).join('');
        lucide.createIcons();
    };
    
    const showCategoryForm = (category = null) => {
        const isEdit = category !== null;
        const formHTML = `
            <form id="category-form">
                <div class="mb-4">
                    <label for="category-name" class="block text-sm font-medium text-gray-700">Nombre de la Categoría</label>
                    <input type="text" id="category-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required value="${isEdit ? category : ''}">
                </div>
                <div class="text-right space-x-2">
                    <button type="button" id="modal-cancel-btn" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">${isEdit ? 'Actualizar' : 'Guardar'}</button>
                </div>
            </form>
        `;
        openModal(isEdit ? 'Editar Categoría' : 'Añadir Categoría', formHTML, 'max-w-md');

        document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);
        document.getElementById('category-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const newName = document.getElementById('category-name').value.trim();
            if (!newName) {
                showCustomAlert('El nombre de la categoría no puede estar vacío.', 'error');
                return;
            }
            const isDuplicate = state.settings.categories.some(c => c.toLowerCase() === newName.toLowerCase() && c !== category);
            if (isDuplicate) {
                showCustomAlert('Esa categoría ya existe.', 'error');
                return;
            }

            if (isEdit) {
                // Update category name in products
                state.inventory.forEach(product => {
                    if (product.category === category) {
                        product.category = newName;
                    }
                });
                // Update category name in the settings array
                const catIndex = state.settings.categories.indexOf(category);
                if (catIndex > -1) {
                    state.settings.categories[catIndex] = newName;
                }
                showCustomAlert('Categoría actualizada correctamente.', 'success');
            } else {
                state.settings.categories.push(newName);
                showCustomAlert('Categoría añadida correctamente.', 'success');
            }
            saveState();
            renderCategoriesInSettings();
            closeModal();
        });
    };

    const renderUsers = () => {
        const usersTableBody = document.getElementById('users-table-body');
        usersTableBody.innerHTML = state.users.map(user => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">${user.username}</td>
                <td class="px-6 py-4 whitespace-nowrap">${user.role}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="edit-user-btn text-indigo-600 hover:text-indigo-900" data-id="${user.id}"><i data-lucide="edit" class="w-5 h-5"></i></button>
                    <button class="delete-user-btn text-red-600 hover:text-red-900 ml-4" data-id="${user.id}"><i data-lucide="trash-2" class="w-5 h-5"></i></button>
                </td>
            </tr>`).join('');
        lucide.createIcons();
    };

    const showUserForm = (user = null) => {
        const isEdit = user !== null;
        const permissions = user?.permissions || {
            viewDashboard: true,
            manageSales: true,
            manageInventory: false,
            viewReports: false,
            manageExpenses: true,
            manageSettings: false
        };
        const permissionLabels = {
            viewDashboard: 'Ver Dashboard',
            manageSales: 'Gestionar Ventas',
            manageInventory: 'Gestionar Inventario',
            viewReports: 'Ver Reportes',
            manageExpenses: 'Gestionar Gastos',
            manageSettings: 'Gestionar Ajustes'
        };
        
        const formHTML = `
            <form id="user-form">
                <input type="hidden" id="user-id" value="${isEdit ? user.id : ''}">
                <div class="mb-4">
                    <label for="user-username" class="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
                    <input type="text" id="user-username" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required value="${isEdit ? user.username : ''}">
                </div>
                <div class="mb-4">
                    <label for="user-password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input type="password" id="user-password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" ${isEdit ? '' : 'required'}>
                    ${isEdit ? '<p class="text-xs text-gray-500 mt-1">Dejar en blanco para no cambiar la contraseña.</p>' : ''}
                </div>
                <div class="mb-4">
                    <label for="user-role" class="block text-sm font-medium text-gray-700">Rol</label>
                    <select id="user-role" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="Administrador" ${isEdit && user.role === 'Administrador' ? 'selected' : ''}>Administrador</option>
                        <option value="Vendedor" ${isEdit && user.role === 'Vendedor' ? 'selected' : ''}>Vendedor</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Permisos</label>
                    <div class="mt-2 grid grid-cols-2 gap-2">
                        ${Object.keys(permissions).map(key => `
                            <div class="flex items-center">
                                <input id="perm-${key}" name="${key}" type="checkbox" ${permissions[key] ? 'checked' : ''} class="h-4 w-4 text-blue-600 border-gray-300 rounded">
                                <label for="perm-${key}" class="ml-2 block text-sm text-gray-900">${permissionLabels[key] || key}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="text-right space-x-2">
                    <button type="button" id="modal-cancel-btn" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">${isEdit ? 'Actualizar Usuario' : 'Crear Usuario'}</button>
                </div>
            </form>`;
        openModal(isEdit ? 'Editar Usuario' : 'Añadir Usuario', formHTML, 'max-w-md');

        const roleSelect = document.getElementById('user-role');
        roleSelect.addEventListener('change', (e) => {
            const newRole = e.target.value;
            const defaultPerms = (newRole === 'Administrador')
                ? { viewDashboard: true, manageSales: true, manageInventory: true, viewReports: true, manageExpenses: true, manageSettings: true }
                : { viewDashboard: true, manageSales: true, manageInventory: false, viewReports: false, manageExpenses: true, manageSettings: false };
            
            Object.keys(defaultPerms).forEach(key => {
                document.getElementById(`perm-${key}`).checked = defaultPerms[key];
            });
        });

        document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);
        document.getElementById('user-form').addEventListener('submit', e => {
            e.preventDefault();
            const id = document.getElementById('user-id').value;
            const username = document.getElementById('user-username').value;
            const password = document.getElementById('user-password').value;
            const role = document.getElementById('user-role').value;
            
            const updatedPermissions = {};
            Object.keys(permissions).forEach(key => {
                updatedPermissions[key] = document.getElementById(`perm-${key}`).checked;
            });

            if (isEdit) {
                const userIndex = state.users.findIndex(u => u.id === parseInt(id));
                if (userIndex !== -1) {
                    state.users[userIndex].username = username;
                    if (password) { state.users[userIndex].password = password; } // Only update password if provided
                    state.users[userIndex].role = role;
                    state.users[userIndex].permissions = updatedPermissions;
                }
                showCustomAlert('Usuario actualizado correctamente.', 'success');
            } else {
                state.users.push({ id: Date.now(), username, password, role, permissions: updatedPermissions });
                showCustomAlert('Usuario creado correctamente.', 'success');
            }
            saveState();
            renderUsers();
            closeModal();
        });
    };

    // --- Import/Export Functions ---
    const exportData = () => {
        const dataStr = JSON.stringify(state, null, 2);
        const dataBlob = new Blob([dataStr], {type: "application/json"});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        const date = new Date().toISOString().split('T')[0];
        link.download = `respaldo_minimarketsys_${date}.json`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url); // Clean up the object URL
        showCustomAlert('Datos exportados exitosamente.', 'success');
    };

    const importData = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (await showCustomConfirm('¿Estás seguro de que quieres importar estos datos? Se sobrescribirán todos los datos actuales. Esta acción es irreversible.')) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const importedState = JSON.parse(e.target.result);
                    // Basic validation to ensure it's a valid backup file
                    if (importedState.inventory && importedState.sales && importedState.users) {
                        localStorage.setItem('miniMarketSysState', JSON.stringify(importedState));
                        localStorage.removeItem('isLoggedIn'); // Force re-login after import
                        localStorage.removeItem('username');
                        showCustomAlert('Datos importados con éxito. Por favor, inicie sesión.', 'success');
                        setTimeout(() => {
                             window.location.reload(); // Reload to apply new state
                        }, 2000);
                    } else {
                        showCustomAlert('El archivo no tiene el formato correcto. Asegúrate de que sea un respaldo válido de VentasSys.', 'error');
                    }
                } catch (error) {
                    showCustomAlert('Error al leer el archivo. Asegúrate de que sea un respaldo válido y no esté corrupto.', 'error');
                    console.error("Error parsing imported file:", error);
                }
            };
            reader.readAsText(file);
        }
        event.target.value = null; // Clear file input
    };

    // --- App Initialization ---
    const startApp = () => {
        loadState();
        if (localStorage.getItem('isLoggedIn') === 'true') {
            if (getCurrentUser()) { // Verify if the logged-in user still exists in the state
                renderDashboardView();
            } else {
                // If user doesn't exist (e.g., after importing new data), log out
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                renderLoginView();
            }
        } else {
            renderLoginView();
        }
    };

    startApp();
});

