// i18n configuration
export type Language = "en" | "es";

export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    // Common
    dashboard: "Dashboard",
    appointments: "Appointments",
    repairs: "Repairs",
    inventory: "Inventory",
    customers: "Customers",
    settings: "Settings",
    help: "Help",
    logout: "Logout",
    search: "Search...",
    viewAll: "View All",
    createNew: "Create New",
    details: "Details",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    profile: "Profile",
    notifications: "Notifications",
    markAllAsRead: "Mark all as read",
    viewAllNotifications: "View all notifications",
    noNotifications: "No new notifications",

    // Dashboard
    todaysAppointments: "Today's Appointments",
    activeRepairs: "Active Repairs",
    lowStockItems: "Low Stock Items",
    completedThisWeek: "Completed This Week",
    recentActivity: "Recent Activity",
    createNewAppointment: "Create New Appointment",

    // Appointments
    time: "Time",
    customer: "Customer",
    service: "Service",
    bike: "Bike",
    technician: "Technician",
    status: "Status",
    arrived: "Arrived",
    customerArrived: "Customer Arrived",

    // Repairs
    intake: "Intake",
    diagnosis: "Diagnosis",
    inProgress: "In Progress",
    qualityCheck: "Quality Check",
    ready: "Ready",
    progress: "Progress",
    estimatedCompletion: "Estimated Completion",

    // Inventory
    reorder: "Reorder",
    units: "units",

    // Workshop Operations
    workshopOperations: "Workshop Operations",
    operationName: "Operation Name",
    estimatedTime: "Estimated Time",
    serviceCost: "Service Cost",
    profitMargin: "Profit Margin",
    finalPrice: "Final Price",

    // Customer Import
    importCustomers: "Import Customers",
    uploadFile: "Upload File",
    downloadTemplate: "Download Template",
    importInstructions: "Upload a CSV or Excel file with customer data",

    // Workshop Entry
    workshopEntry: "Workshop Entry",
    bikeDetails: "Bike Details",
    brand: "Brand",
    model: "Model",
    bikeType: "Bike Type",
    initialDiagnosis: "Initial Diagnosis",
    selectOperations: "Select Operations",
    generateQuote: "Generate Quote",
    assignTechnician: "Assign Technician",

    // Customer Orders
    customerOrders: "Customer Orders",
    orderedProduct: "Ordered Product",
    orderAmount: "Order Amount",
    orderStatus: "Order Status",
    pendingOrder: "Pending Order",
    orderPlaced: "Order Placed",
    receivedAtWorkshop: "Received at Workshop",
    customerNotified: "Customer Notified",
    paymentStatus: "Payment Status",
    paid: "Paid",
    unpaid: "Unpaid",
  },
  es: {
    // Común
    dashboard: "Panel de Control",
    appointments: "Citas",
    repairs: "Reparaciones",
    inventory: "Inventario",
    customers: "Clientes",
    settings: "Configuración",
    help: "Ayuda",
    logout: "Cerrar Sesión",
    search: "Buscar...",
    viewAll: "Ver Todo",
    createNew: "Crear Nuevo",
    details: "Detalles",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    profile: "Perfil",
    notifications: "Notificaciones",
    markAllAsRead: "Marcar todo como leído",
    viewAllNotifications: "Ver todas las notificaciones",
    noNotifications: "No hay nuevas notificaciones",

    // Panel de Control
    todaysAppointments: "Citas de Hoy",
    activeRepairs: "Reparaciones Activas",
    lowStockItems: "Productos con Poco Stock",
    completedThisWeek: "Completadas Esta Semana",
    recentActivity: "Actividad Reciente",
    createNewAppointment: "Crear Nueva Cita",

    // Citas
    time: "Hora",
    customer: "Cliente",
    service: "Servicio",
    bike: "Bicicleta",
    technician: "Técnico",
    status: "Estado",
    arrived: "Llegó",
    customerArrived: "Cliente Llegó",

    // Reparaciones
    intake: "Recepción",
    diagnosis: "Diagnóstico",
    inProgress: "En Proceso",
    qualityCheck: "Control de Calidad",
    ready: "Lista",
    progress: "Progreso",
    estimatedCompletion: "Finalización Estimada",

    // Inventario
    reorder: "Reponer",
    units: "unidades",

    // Operaciones de Taller
    workshopOperations: "Operaciones de Taller",
    operationName: "Nombre de la Operación",
    estimatedTime: "Tiempo Estimado",
    serviceCost: "Costo del Servicio",
    profitMargin: "Margen de Beneficio",
    finalPrice: "Precio Final",

    // Importación de Clientes
    importCustomers: "Importar Clientes",
    uploadFile: "Subir Archivo",
    downloadTemplate: "Descargar Plantilla",
    importInstructions: "Sube un archivo CSV o Excel con datos de clientes",

    // Entrada a Taller
    workshopEntry: "Entrada a Taller",
    bikeDetails: "Detalles de la Bicicleta",
    brand: "Marca",
    model: "Modelo",
    bikeType: "Tipo de Bicicleta",
    initialDiagnosis: "Diagnóstico Inicial",
    selectOperations: "Seleccionar Operaciones",
    generateQuote: "Generar Presupuesto",
    assignTechnician: "Asignar Técnico",

    // Pedidos de Clientes
    customerOrders: "Pedidos de Clientes",
    orderedProduct: "Producto Solicitado",
    orderAmount: "Importe",
    orderStatus: "Estado del Pedido",
    pendingOrder: "Pendiente de Pedido",
    orderPlaced: "Pedido Realizado",
    receivedAtWorkshop: "Recibido en Taller",
    customerNotified: "Cliente Avisado",
    paymentStatus: "Estado de Pago",
    paid: "Pagado",
    unpaid: "No Pagado",
  },
};

// Default language
let currentLanguage: Language = "en";

// Get and set language functions
export const getLanguage = (): Language => currentLanguage;
export const setLanguage = (lang: Language): void => {
  currentLanguage = lang;
};

// Translation function
export const t = (key: TranslationKey): string => {
  return translations[currentLanguage][key] || translations.en[key] || key;
};
