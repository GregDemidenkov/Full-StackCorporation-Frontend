import React, { useState } from 'react'

import { useAppDispatch } from 'redux/store';
import { resetPassword } from 'redux/auth/asyncActions';

import { ShowProfile } from 'types/user/profile';

import { Edit } from 'components/ui/svg/edit/Edit';
import { UploadAvatar } from 'components/ui/uploadAvatar/UploadAvatar';

import styles from './profileContent.module.scss'

export const ProfileContent: React.FC<ShowProfile> = ({user, profile_avatar}) => {

    const dispatch = useAppDispatch()

    const [isOpenEditInputs, setOpenEditInputs] = useState(false)
    const [changeHandler, setChangeHandler] = useState(false)

    return (
        <div className = {styles.profileContent}>
            <div className = {styles.firstSection}>
                <p>Created at: <span>{user.create_at}</span></p>
                <div onClick = {() => setOpenEditInputs(!isOpenEditInputs)} className = {styles.editWrapper}>
                    <p>Edit</p>
                    <Edit />
                </div>
            </div>
            <div className = {styles.secondSection}>
                <div className = {styles.imgBlock}>
                    <img src = {profile_avatar} alt="avatar" />
                    <h3>{user.username}</h3>
                    <UploadAvatar />
                </div>
                <ul className = {styles.infoBlock}>
                    <li className = {styles.infoBlock_el}>
                        <p className = {styles.label}>First name:</p>
                        {
                            !isOpenEditInputs 
                            ? <p className = {styles.value}>{user.first_name}</p>
                            : <input required type="text" value = {user.first_name}/>
                        }
                    </li>
                    <li className = {styles.infoBlock_el}>
                        <p className = {styles.label}>Second name:</p>
                        {
                            !isOpenEditInputs 
                            ? <p className = {styles.value}>{user.last_name}</p>
                            : <input required type="text" value = {user.last_name}/>
                        }
                    </li>
                    <li className = {styles.infoBlock_el}>
                        <p className = {styles.label}>Email:</p>
                        {
                            !isOpenEditInputs 
                            ? <p className = {styles.value}>{user.email}</p>
                            : <input required type="text" value = {user.email}/>
                        }
                    </li>
                    <li className = {styles.infoBlock_el}>
                        {
                            !isOpenEditInputs 
                            ? <button onClick={() => {setChangeHandler(true); dispatch(resetPassword({email: user.email}))}} className = {styles.button}>Change Password</button>
                            : <button className = {styles.button} onClick = {() => setOpenEditInputs(!isOpenEditInputs)}>Apply</button>
                        }
                    </li>
                    {
                        changeHandler && <p className = {styles.confirm}>Confirm operation on your email</p>
                    }
                </ul>
            </div>
        </div>
    );
}