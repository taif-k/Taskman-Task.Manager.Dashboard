
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/DataMode"
import { store } from "./store/Store"
import { Provider } from "react-redux"

function App() {

  return (

    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  )
}

export default App
