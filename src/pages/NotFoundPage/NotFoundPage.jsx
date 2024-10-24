import { NavLink } from "react-router-dom"

export default function NotFoundPage (){
    return(
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
        <p>It seems you&apos;ve taken a wrong turn. Don&apos;t worry, let&apos;s get you back on track!</p>
        <NavLink to="/home" style={{ color: '#007bff', textDecoration: 'none' }}>
          Go to Home Page
        </NavLink>
      </div>
    )
}

// 
