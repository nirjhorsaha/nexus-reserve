import MainLayout from './components/layout/MainLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'

const App: React.FC = () => {
  return (
    <div>
      <ProtectedRoute role={'undefined'}>
        <MainLayout />
      </ProtectedRoute>
    </div>
  )
}

export default App