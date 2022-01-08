import { Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter,  ModalBody, ModalCloseButton, Button, useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { InputChange } from '../../../utils/TypeScript'


export default function EditProfile() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    // user
    const initialState = { name:'' ,email: '', password:'', cf_password:''}
    const [user, setUser] = useState(initialState)
    const { name, email, password, cf_password } = user
    
    const handleInputChange = (e: InputChange) =>{
        const {name, value} = e.target
        setUser({...user, [name]:value})
    }


    return (
      <>
        <button className='w-10/12 border border-gray-600 my-2' onClick={onOpen}> Edit Profile </button>
      
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Profile </ModalHeader>   <ModalCloseButton />
            <ModalBody>
            <form className=''>

                <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                    <input type="text" name='name' placeholder='Name' value={name} onChange={handleInputChange}
                     className='outline-none w-full' autoComplete='off' />
                </div>

                <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                    <input type="text" name='email' placeholder='E-Mail' value={email} onChange={handleInputChange}
                     className='outline-none w-full' autoComplete='off' />
                </div>

                <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                    <input type="password" name='password' placeholder='Password' value={password} onChange={handleInputChange}
                     className='outline-none w-full' />
                </div>

                <div className='border-b border-gray-400 hover:border-gray-800 py-2'>
                    <input type="password" name='cf_password' placeholder='Confirm Password' value={cf_password} onChange={handleInputChange}
                     className='outline-none w-full' />
                </div>

            </form>
            </ModalBody>
  
            <ModalFooter>
              <Button variant='ghost' type='submit'>Update Profile </Button>
            </ModalFooter>

          </ModalContent>
        </Modal>
      </>
    )
  }