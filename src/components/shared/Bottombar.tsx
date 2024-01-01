import { bottombarLinks } from '@/constants';
import { INavLink } from '@/types';
import {Link, useLocation} from 'react-router-dom'

const Bottombar = () => {
  const {pathname} = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link:INavLink)=>{
            const isActive = pathname === link.route;
            return (
              <Link
                to={link.route}
                key={link.label} 
                className={`${isActive && 'bg-primary-500 rounded-[10px]'} flex-center flex-col gap-1 p-2 transition`}
              >
                <img 
                  src={link.imgURL} 
                  alt={link.label} 
                  width={18}
                  height={18}
                  className={`${isActive && 'invert-white'}`}
                />
                <p className="tiny-medium text-light-2">{link.label}</p>
              </Link>
          )
          })}
    </section>
  )
}

export default Bottombar