import React from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import { BiEditAlt } from 'react-icons/bi'
import { FcOpenedFolder } from 'react-icons/fc'
import PlayGround from '../../Pages/PlayGround';
import Card from '../Card';
import { ModalContext } from '../../Context/ModalContext';
import { PlaygroundContext } from '../../Context/PlaygroundContext';
import { useNavigate } from 'react-router-dom';
import {BiLogOut} from 'react-icons/bi'
import {BiUserCircle} from 'react-icons/bi'
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth} from '../../firebaseConfig'
function RightPaneScreen() {
  const [user] = useAuthState(auth);

  const { openModal } = React.useContext(ModalContext);
  const { folders, deleteFolder, deleteCard } = React.useContext(PlaygroundContext);
  const navigate = useNavigate();

  const logout = (e) => {
    auth.signOut().then(() => {
        window.localStorage.clear();
        console.log("Sign-out successful.")
    }).catch((error) => {
        console.log(error)
        console.log("Sign-out Unsuccessful.")
    });
}

  return (
    <div className='h-screen p-8'>
      <div className='cursor-pointer flex justify-between placeholder:mt-8 items-center'>
        <h2> My <span className='font-semibold text-2xl'> PlayGround</span></h2>
        <h4
          onClick={() => {
            openModal({
              show: true,
              modalType: 1,
              identifiers: {
                folderId: "",
                playgroundId: "",
              }
            })
          }}

        > <span className='font-semibold text-2xl'> +</span> New Folder</h4>
        <h4> {user && <span onClick={()=>logout()} className='flex gap-2 items-center cursor-pointer'>Logout <BiLogOut/> </span>} </h4>
      </div>
      <hr className='mb-12 mt-4 bg-black' />
      {
        folders && Object.entries(folders).map(([folderId, folder]) => (
          <div className='flex-col flex my-8'>
            <div className='cursor-pointer flex justify-between placeholder:mt-8 items-center'>
              <div className='flex gap-4 items-center'>
                <FcOpenedFolder size={'2em'} />
                <h5 className='font-semibold'>{folder.title} </h5>
              </div>
              <div className='flex gap-4 items-center'>
                <BiEditAlt size={'1.12em'} onClick={() => openModal({
                  show: true,
                  modalType: 4,
                  identifiers: {
                    folderId: folderId,
                    cardId: "",
                  }
                })} />
                <IoTrashOutline size={'1.2em'} onClick={() => {
                  deleteFolder(folderId)
                }} />
                <h5 onClick={() => openModal({
                  show: true,
                  modalType: 2,
                  identifiers: {
                    folderId: folderId,
                    cardId: "",
                  }
                })}
                  className='cursor-pointer font-semibold'>+ <span>{" "}New PlayGround</span> </h5>
              </div>
            </div>
            <hr className='mb-12 mt-4 bg-black' />
            <div className=' cursor-pointer grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
              {Object.entries(folder["playgrounds"]).map(([playgroundId, playground]) => (
                <Card key={playgroundId} >
                  <div onClick={(e) => {
                    e.stopPropagation(); // stop click progation to parent
                    navigate(`/playground/${folderId}/${playgroundId}`)
                  }} className='flex items-center justify-between'>
                    <div className='cursor-pointer flex gap-4 items-center '>
                      <img class='h-12 w-12' src='/logo.png' alt='logo' />
                      <div>
                        <h6>{playground?.title}</h6>
                        <h6>Language: {playground?.language}</h6>
                      </div>
                    </div>
                    <div className='flex gap-4 items-center ' onClick={(e) => {
                      e.stopPropagation(); // stop click progation to parent
                    }}>
                      <BiEditAlt size={'1.12em'}
                        onClick={() => openModal({
                          show: true,
                          modalType: 5,
                          identifiers: {
                            folderId: folderId,
                            cardId: playgroundId,
                          }
                        })}
                      />
                      <IoTrashOutline size={'1.2em'} onClick={() => {
                        console.log("clicked");
                        deleteCard(folderId, playgroundId)
                      }} />
                    </div>
                  </div>
                </Card>
              ))}

            </div>
          </div>
        )
        )}
    </div>
  )
}

export default RightPaneScreen