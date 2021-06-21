import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './styles.css'

const WelcomeMessage = ({ user }) => {

    const baseWelcomeClass = 'welcomeMessage text-center mt-3'
    const [welcomeMessageClass, setWelcomeMessageClass] = useState(baseWelcomeClass)
    const notes = useSelector(state => state.notes)

    useEffect(() => {
        // console.log(notes.hasOwnProperty('notes'), notes['notes']);
        if (!notes.hasOwnProperty('notes'))
            return
        if (notes.hasOwnProperty('notes') && notes['notes'].length)
            setWelcomeMessageClass(`${baseWelcomeClass} animateHide`)
        else if (!notes.hasOwnProperty('notes') || (notes.hasOwnProperty('notes') && !notes['notes'].length))
            setWelcomeMessageClass(baseWelcomeClass)
    }, [notes])

    return (
        <div className={welcomeMessageClass}>
            <h1>Hello {user.split(' ')[0]} </h1>
            <h5>Get started by adding your first note</h5>
        </div>
    )
}

export default WelcomeMessage