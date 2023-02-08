import React, {useEffect} from 'react'

import { useAppDispatch, useAppSelector } from 'redux/store';
import { getMe } from 'redux/profile/asyncActions';

import { Navbar } from 'components/common/profileNavbar/Navbar'
import { ProfileContent } from 'components/pages/profile/profileContent/ProfileContent';

import styles from './profile.module.scss'

export const ProfilePage: React.FC = () => {
    
    const dispatch = useAppDispatch();

    const { user, avatar } = useAppSelector(state => state.profile)

    console.log(avatar)

    useEffect(() => {
        dispatch(getMe())
    }, [])

    return (
        <section className = {styles.baseSection}>
            <div className="mainContainer">
                <div className = {styles.pageContent}>
                    <Navbar />
                    <ProfileContent user = {user} profile_avatar = {avatar}/>
                </div>
            </div>
        </section>
    );
}