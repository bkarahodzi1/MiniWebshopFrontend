import AdminLayout from "../../components/admin/AdminLayout"

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

        <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900">General Settings</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your dashboard preferences.</p>

          <div className="mt-5 border-t border-gray-200 pt-5">
            <div className="space-y-6">
              <div>
                <label htmlFor="site-name" className="block text-sm font-medium text-gray-700">
                  Site Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="site-name"
                    id="site-name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue="EcoShop Admin"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700">
                  Admin Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="admin-email"
                    id="admin-email"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    defaultValue="admin@example.com"
                  />
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="notifications"
                    name="notifications"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    defaultChecked
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="notifications" className="font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-gray-500">Receive email notifications for new orders.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
