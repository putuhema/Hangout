import PropType from 'prop-types'
import Navbar from "../shared/Navbar"
import { Toaster } from '../ui/toaster'
import SearchBox from '../shared/SearchBox'


const Container = ({ children }) => {
    return (
        <div>
            <SearchBox />
            <Navbar />
            {/* FIXME: responsive on smaller screen */}
            <main className="w-full px-14 md:px-20 lg:px-0 lg:w-[1280px] mx-auto">
                <div className='mt-20'>
                    {children}
                </div>
            </main>
            <Toaster />
        </div>
    )
}

Container.propTypes = {
    children: PropType.node.isRequired
}

export default Container