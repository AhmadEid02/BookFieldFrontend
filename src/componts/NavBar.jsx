import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { Navigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('user')
        // dispatch logout action
        navigate('/')
        window.location.reload(false);
    }
    const handelDashboard = () => {
        navigate('/dashboard')
        window.location.reload(false);
    }
    const user = JSON.parse(localStorage.getItem('user'))
    let sty = { display: "flex", justifyoCntent: "center", alignItems: "spaceBetween", }
    let stye = { cursor: "pointer" ,padding: "4px" }
    return (
        <nav>
            <Link className='link' to="/"><h1> <span className='org'>B</span>ook <span className='org'>F</span>ield</h1></Link>
            {/* <span className="material-symbols-outlined">
                sports_soccer
            </span> */}
            {user ?
                (<div style={sty}>
                    <span onClick={handelDashboard} style={stye}>{user.email}</span>
                    
                        <span class="material-symbols-outlined" onClick={logout} style={stye}>
                            logout
                        </span>
                </div>)
                :
                (<div className='log'>
                    <Link to="login">login</Link>
                    <Link to="signup">signup</Link>

                </div>)}


        </nav>
    )
}

export default NavBar