import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from './components/ui/button'
import { cn } from './lib/utils'
import axios from 'axios'


function App() {
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    password: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('Required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    validationSchema,
    onSubmit:async (values) => {
      console.log(values)
      try {
        // fetch('http://localhost:3000/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ values }),
        // })
        //   .then((res) => res.json())
        //   .then((data) => console.log(data))
        //   .catch((err) => console.error(err));

        const res = axios.post('http://localhost:3000/login', values)
        console.log((await res).data.message)
        
      } catch (error) {
        console.log(error)
      }
      
    },
  })

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <form 
        onSubmit={formik.handleSubmit} 
        className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder='Enter your email'
            className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
          {formik.errors.email && <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder='Enter your name'
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
          {formik.errors.name && <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">password</label>
          <input
            id="password"
            name="password"
            type="text"
            placeholder='Enter your password'
            value={formik.values.password}
            onChange={formik.handleChange}
            className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
          {formik.errors.password && <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>}
        </div>

        <Button 
          type="submit"
          className={cn("w-full bg-yellow-500 text-black font-semibold py-2 rounded-md hover:bg-yellow-400 transition-all duration-300")}
        >
          Submit
        </Button>
      </form>
    </div>
  )
}

export default App
