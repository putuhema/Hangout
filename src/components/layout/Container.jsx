import PropType from 'prop-types'
import Navbar from "../shared/Navbar"

const Container = ({ children }) => {
    return (
        <>
            <Navbar />
            {/* FIXME: responsive on smaller screen */}
            <main className="w-full lg:w-[1280px] mx-auto">
                <div className='mt-20'>
                    {children}
                </div>
            </main>
        </>
    )
}

Container.propTypes = {
    children: PropType.node.isRequired
}

export default Container