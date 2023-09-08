import RiveEmpty from './RiveEmpty'

const NoResources = ({ text }) => {
    return (
        <div className="w-full flex flex-col items-center col-span-4 text-muted-foreground">
            <p className="text-center">{text}</p>
            <div className="w-[200px] h-[400px] object-cover">
                <RiveEmpty />
            </div>
        </div>
    )
}

export default NoResources