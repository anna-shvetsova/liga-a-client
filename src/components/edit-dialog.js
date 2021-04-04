import React, { useCallback } from 'react';
import {
    Grid, Dialog, DialogTitle, DialogActions,
    DialogContent, TextField, Button, Checkbox, FormControlLabel,
    Input, RadioGroup, Radio, CircularProgress
} from '@material-ui/core';
import { areFieldsValid } from '../utils';

const getErrorParams = ({ value, normalize, validate, errorText, okText }) => {
    if (normalize) value = normalize(value);
    const error = (validate) ? !validate(value) : false;
    const helperText = error ? errorText : okText;
    return {
        value,
        error,
        helperText
    }
}

const EditDialog = ({ dialogParams, setDialogParams, dialogFields, setDialogFields }) => {

    // console.log('Rendering EditDialog');

    const onFieldChange = useCallback((event) => {
        const { id, name } = event.target;
        const fieldId = (id) ? id : name;

        const idx = dialogFields.findIndex(el => el.id === fieldId);

        const dialogField = dialogFields[idx];
        const { type, controlType } = dialogField;

        let value;
        switch (controlType) {
            case 'Checkbox':
                value = event.target.checked;
                break;
            case 'Input':
                if (type === 'file') {
                    value = event.target.files[0];
                }
                break;
            default:
                value = event.target.value;
        };

        const { value: newValue, error, helperText } = getErrorParams({ ...dialogField, value });

        setDialogFields([
            ...dialogFields.slice(0, idx),
            {
                ...dialogFields[idx],
                value: newValue, error, helperText
            },
            ...dialogFields.slice(idx + 1)
        ]);
    }, [dialogFields, setDialogFields]);

    const onOkClick = useCallback(() => {
        const dialogFieldsCopy = [...dialogFields];
        dialogFieldsCopy.forEach(el => {
            const { value, error, helperText } = getErrorParams(el);
            el.value = value;
            el.error = error;
            el.helperText = helperText;
        });
        setDialogFields([...dialogFieldsCopy]);

        if (!areFieldsValid(dialogFieldsCopy)) return;

        setDialogParams({
            ...dialogParams,
            // open: false,
            // open: true,
            okPressed: true,
            loading: true
        });
    }, [dialogParams, dialogFields, setDialogParams, setDialogFields]);

    const onCancelClick = useCallback(() => {
        setDialogParams({
            ...dialogParams,
            open: false,
            okPressed: false
        });
    }, [dialogParams, setDialogParams]);

    const renderField = useCallback((fi, idx) => {
        const props = {};
        props.id = fi.id;
        props.onChange = onFieldChange;
        props.autoFocus = (idx === 0);
        switch (fi.controlType) {
            case 'TextField':
                props.label = fi.label;
                props.type = fi.type;
                props.defaultValue = fi.value;
                props.required = fi.required;
                props.helperText = fi.helperText;
                props.error = fi.error;
                props.margin = 'normal';
                props.fullWidth = true;
                props.onFocus = (event) => { event.target.select() };
                if (fi.type === 'time') {
                    props.InputLabelProps = { shrink: true };
                    props.inputProps = { step: fi.step * 60 };
                };
                return (
                    <TextField {...props} />
                );
            case 'Checkbox':
                props.checked = fi.value;
                return (
                    <FormControlLabel
                        control={
                            <Checkbox color='primary' {...props} />
                        }
                        label={fi.label}
                    />
                );
            case 'Input':
                props.type = fi.type;
                props.required = fi.required;
                props.error = fi.error;
                props.inputProps = { accept: fi.accept };
                return (
                    <Input {...props} />
                );
            case 'Radio':
                return (
                    <RadioGroup value={fi.value} row>
                        {
                            fi.arrValues.map((el) => {
                                return <FormControlLabel
                                    {...props}
                                    key={el} value={el}
                                    control={<Radio color='primary' />}
                                    name={fi.id}
                                    label={el} />
                            })
                        }
                    </RadioGroup>
                )
            default:
        }
        return null;
    }, [onFieldChange]);

    return (
        <Dialog open={dialogParams.open} onEscapeKeyDown={onCancelClick}>
            <DialogTitle>{dialogParams.title}</DialogTitle>
            <DialogContent>
                <Grid container direction='column'>
                    {
                        dialogFields.map((fi, idx) => {
                            return (
                                <li key={fi.id} style={{ listStyleType: 'none' }}>
                                    { renderField(fi, idx)}
                                </li>
                            )
                        })
                    }
                </Grid>
            </DialogContent>
            <DialogActions>
                {
                    !dialogParams.loading && (
                        <Button onClick={onOkClick}>
                            Ok
                        </Button>
                    )
                }
                {
                    dialogParams.loading && (
                        <CircularProgress color='primary' />
                    )
                }
                <Button onClick={onCancelClick}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditDialog;
