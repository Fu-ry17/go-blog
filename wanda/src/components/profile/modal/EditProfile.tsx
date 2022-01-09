import { Modal, ModalOverlay, ModalContent, ModalHeader,
   ModalBody, ModalCloseButton, Button, useDisclosure, Avatar, Spinner,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetPassword, updateUser } from '../../../redux/actions/profileActions'
import { ALERT } from '../../../redux/types/alertTypes'
import { InputChange, IUserProfile, RootStore, FormSubmit } from '../../../utils/TypeScript'
import { validImage } from '../../../utils/valid'
import NotFound from '../../NotFound'

export default function EditProfile() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { auth, alert } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch()

    // user
    const initialState = { name:'' ,email: '', password:'', cf_password:'', avatar: ''}
    const [user, setUser] = useState<IUserProfile>(initialState)
    const { name, password, cf_password, avatar } = user

   const handleImageChange = (e: InputChange) => {
     const target = e.target as HTMLInputElement
     const files = target.files

     if(files){
       const file = files[0]
       const check = validImage(file)
       if(check) return dispatch({ type: ALERT, payload: { error: check}})
       setUser({ ...user, avatar: file})
     }

   }
    
   const handleInputChange = (e: InputChange) =>{
        const {name, value} = e.target
        setUser({...user, [name]:value})
   }
  
   const handleUpdate = (e: FormSubmit) =>{
     e.preventDefault()
     if(name || avatar) dispatch(updateUser(name,(avatar as File), auth))
     if(password && auth.accessToken) dispatch(resetPassword(password, cf_password, auth))
   }

   if(!auth.user) return <NotFound />

    return (
      <>
        <button className='w-10/12 border border-gray-600 my-2' onClick={onOpen}> Edit Profile </button>
      
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Profile </ModalHeader>   <ModalCloseButton />
            <ModalBody>
            <form className='' onSubmit={handleUpdate}>

                 <div className='flex flex-col w-full items-center'>
                   <Avatar src={ avatar ? URL.createObjectURL((avatar as File)) : auth.user.avatar} size="xl" />
                   <div>
                      {/* label error */}
                       {/* <label htmlFor="file">Change</label> */}
                       <input type="file" name='file' accept='image/*' onChange={handleImageChange} />
                   </div>
                 </div>

                <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                    <input type="text" name='name' placeholder='Name' defaultValue={auth.user.name} onChange={handleInputChange}
                     className='outline-none w-full' autoComplete='off' />
                </div>

                <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                    <input type="text" name='email' placeholder='E-Mail' defaultValue={auth.user.email} onChange={handleInputChange}
                     className='outline-none w-full' autoComplete='off' disabled />
                </div>

                <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                    <input type="password" name='password' placeholder='Password' value={password} onChange={handleInputChange}
                     className='outline-none w-full' />
                </div>

                <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                    <input type="password" name='cf_password' placeholder='Confirm Password' value={cf_password} onChange={handleInputChange}
                     className='outline-none w-full' />
                </div>

                <div className='flex justify-between py-4'>
                  <span></span>
                  { alert.loading ? <Spinner /> : <Button variant='ghost' type='submit' >Update Profile </Button> }
                </div>

            </form>
            </ModalBody>

          </ModalContent>
        </Modal>
      </>
    )
  }