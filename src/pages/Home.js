import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotes } from '../redux/slices/notesSlice'
import { addUser } from '../redux/slices/userSlice'
import Navbar from '../components/Navbar/Navbar'
import LabelsContainer from '../components/LabelsContainer/LabelsContainer'
import Label from '../components/Label/Label'
import NotesContainer from '../components/NotesContainer/NotesContainer'
import WelcomeMessage from '../components/WelcomeMessage/WelcomeMessage'
import Note from '../components/Note/Note'
import UpdateNote from '../components/UpdateNote/UpdateNote'
import CreateNote from '../components/CreateNote/CreateNote'
import ImagesContainer from '../components/ImagesContainer/ImagesContainer'
import UpdateProfile from '../components/UpdateProfile/UpdateProfile'
import { motion, AnimatePresence } from 'framer-motion'

const Home = ({ history }) => {
    const dispatch = useDispatch()
    // eslint-disable-next-line
    const user = useSelector(state => state.user)
    // eslint-disable-next-line
    const notes = useSelector(state => state.notes)
    const [labels, setLabels] = useState([])
    const currentNote = useSelector(state => state.modals.updateNoteModal)
    const id = currentNote.id

    useEffect(() => {
        if (!user.id)
            return
        axios.get(`https://quick-notes-backend.onrender.com/api/notes/getAllNotes/${user.id}`)
            .then(response => {
                if (!response.data.length)
                    return
                console.log(response.data)
                let processedLabels = []
                response.data.forEach(note => {
                    let rawLabels = note.labels
                    rawLabels = (rawLabels && rawLabels.length) ? rawLabels[0].split(',') : null
                    if (rawLabels === null)
                        return
                    else if (rawLabels.length === 1) {
                        processedLabels.push(rawLabels[0])
                        return
                    }
                    rawLabels.forEach(ele => {
                        if (!labels.includes(ele))
                            processedLabels.push(ele)
                    })

                })
                setLabels(processedLabels)
                setTimeout(() => { dispatch(setNotes(response.data)) }, 850)
            })
            .catch(error => console.log(error))
        // eslint-disable-next-line
    }, [user])

    // check authorization on each render
    useEffect(() => {
        if (!localStorage.getItem('user'))
            history.push('/login')
        else
            dispatch(addUser(JSON.parse(localStorage.getItem('user'))))
    })


    return (
        <>
            <Navbar name={user.name} />

            <motion.div layout className={`container content px-1`}>

                <div className="d-flex flex-column flex-md-row align-items-center labelsContainer main">
                    <h6 className="labelHeading pl-3 pr-2 pt-2 pt-md-0 py-md-2 mb-0">Labels</h6>
                    <LabelsContainer className="labels d-flex align-self-start align-items-center ml-md-2 pb-2 pt-3 px-1">
                        <Label inHome={true} index={0}>All</Label>
                        {
                            labels.length > 0 &&
                            labels.map((label, index) => <Label inHome={true} index={index + 1} key={index} >{label}</Label>)
                        }
                    </LabelsContainer>
                </div>

                <NotesContainer>
                    <WelcomeMessage user={user.name} />
                    <AnimatePresence>
                        {
                            notes.hasOwnProperty('notes') &&
                            notes.notes.map((note, index) => <Note key={note._id} index={index} homeLabels={labels} setHomeLabels={setLabels} {...note} />)
                        }
                    </AnimatePresence>
                </NotesContainer>

                <UpdateProfile />


                <AnimatePresence>
                    {
                       id && <UpdateNote />
                    }
                </AnimatePresence>

                <CreateNote homeLabels={labels} setHomeLabels={setLabels} />

                <ImagesContainer inHome={true} />

            </motion.div>
        </>
    )
}

export default Home