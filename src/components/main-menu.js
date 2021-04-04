import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { Button, Grid, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import EditDialog from './edit-dialog';
import Restrictions from '../restrictions';
import { getValuesFromFields } from '../utils';
import { signUp, signIn, logout } from '../actions';

const MainMenu = () => {
    const { _id } = useSelector(state => state);
    const dispatch = useDispatch();

    const [snackbarParams, setSnackbarParams] = useState({ open: false, message: '' });

    const defaultDialogParams = {
        open: false,
        title: '',
        mode: undefined,
        okPressed: false,
        loading: false
    };
    const [dialogParams, setDialogParams] = useState(defaultDialogParams);
    const [dialogFields, setDialogFields] = useState([]);

    const getDefaultEditFields = useCallback((mode) => {
        const restr = new Restrictions();
        const fields = (mode === 'signUp') ?
            ['name', 'surname', 'email', 'password', 'role'] :
            ['email', 'password'];
        return restr.getFields(fields);
    }, []);

    const onSignupClick = () => {
        setDialogFields(getDefaultEditFields('signUp'));
        setDialogParams({
            ...defaultDialogParams,
            open: true,
            title: 'Signing up',
            mode: 'SIGNUP'
        });
    }

    const onSigninClick = () => {
        setDialogFields(getDefaultEditFields('signIn'));
        setDialogParams({
            ...defaultDialogParams,
            open: true,
            title: 'Signing in',
            mode: 'SIGNIN'
        });
    }

    const onLogoutClick = () => {
        dispatch(logout());
    }

    const authHandler = useCallback(async (action, params) => {
        try {
            await dispatch(action(params));
            setDialogParams({ ...dialogParams, okPressed: false, open: false });
        } catch (err) {
            let userMessage='';
            switch (err.message) {
                case 'INVALID_PASSWORD':
                    userMessage = 'Pair email/password isn\'t correct';
                    break;
                case 'EMAIL_NOT_FOUND':
                    userMessage = 'There is no user registered under such email';
                    break;
                case 'EMAIL_EXISTS':
                    userMessage = 'User with such an email already exists';
                    break;
                default:
                    userMessage = err.message;
            }
            setSnackbarParams({ open: true, message: userMessage });
            setDialogParams({ ...dialogParams, okPressed: false, loading: false });
        }
    }, [dialogParams, setDialogParams, dispatch]);

    useEffect(() => {

        if (!dialogParams.okPressed) return;
        const params = getValuesFromFields(dialogFields);
        switch (dialogParams.mode) {
            case 'SIGNUP':
                authHandler(signUp, params);
                break;
            case 'SIGNIN':
                authHandler(signIn, params);
                break;
            default:
        }
        
    }, [dialogParams, dialogFields, authHandler])

    return (
        <Fragment>
            <Grid container direction='row' justify='flex-end' alignItems='center'>
                {!_id &&
                    <Button
                        onClick={onSignupClick}
                    >
                        Sign up
                        </Button>
                }
                {!_id &&
                    <Button
                        onClick={onSigninClick}
                    >
                        Sign in
                        </Button>
                }
                {_id &&
                    <Button
                        onClick={onLogoutClick}
                    >
                        Log out
                        </Button>
                }
            </Grid>
            {
                dialogParams.open &&
                <EditDialog
                    dialogParams={dialogParams}
                    setDialogParams={setDialogParams}
                    dialogFields={dialogFields}
                    setDialogFields={setDialogFields}
                />
            }
            <Snackbar
                open={snackbarParams.open}
                message={snackbarParams.message}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                autoHideDuration={6000}
                onClose={() => setSnackbarParams({ open: false })}
                action={
                    <Fragment>
                        <Button size='small' aria-label='close' color='secondary' onClick={() => setSnackbarParams({ open: false })}>
                            <Close />
                        </Button>
                    </Fragment>
                }
            />
        </Fragment>
        // <h2>This is MainMenu</h2>
    )
}

export default MainMenu;