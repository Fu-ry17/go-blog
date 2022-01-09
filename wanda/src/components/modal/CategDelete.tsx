import { DeleteIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalBody, ModalCloseButton, Button, useDisclosure, ModalFooter,
 } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { deleteCateory } from '../../redux/actions/categoryActions'
import { IAuth } from '../../redux/types/authTypes'
import { ICategory } from '../../utils/TypeScript'

 interface Iprops {
    categ: ICategory,
    auth: IAuth
 }
 
const DeleteCategModal: React.FC<Iprops> = ({ categ, auth }) => {
     const { isOpen, onOpen, onClose } = useDisclosure()
     const dispatch = useDispatch()
    
     const handleDelete = (id: string) => {
         if(!auth.accessToken) return
         dispatch(deleteCateory(id, auth.accessToken))
     }
 
     return (
       <>
        <DeleteIcon onClick={onOpen}/> 
       
         <Modal isOpen={isOpen} onClose={onClose}>
           <ModalOverlay />
           <ModalContent>
             <ModalHeader>Delete Category </ModalHeader>   <ModalCloseButton />
             <ModalBody>
             
             <h1> Are you sure you want to delete <span className='font-bold'>{categ.name}</span>? </h1>
                
             </ModalBody>
                
                <ModalFooter>
                <Button colorScheme='red' onClick={()=> handleDelete(categ._id)}>Yes</Button>
                <span className='px-2'></span>
                <Button mr={3} onClick={onClose}>  No </Button>
                </ModalFooter>
                
                
 
           </ModalContent>
         </Modal>
       </>
     )
   }

   export default DeleteCategModal