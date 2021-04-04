export default class Restrictions {

    fields = [
        {
            id: 'name',
            label: 'Name:',
            controlType: 'TextField',
            type: 'text',
            required: true,
            value: '', // 'John',
            error: false,
            helperText: '',
            okText: '',
            normalize: (val) => { return val.trim() },
            validate: (val) => { return val.length !== 0 },
            errorText: 'Shouldn\'t be empty'
        },
        {
            id: 'surname',
            label: 'Surname:',
            controlType: 'TextField',
            type: 'text',
            required: true,
            value: '', // 'Smith',
            error: false,
            helperText: '',
            okText: '',
            normalize: (val) => { return val.trim() },
            validate: (val) => { return val.length !== 0 },
            errorText: 'Shouldn\'t be empty'
        },
        {
            id: 'email',
            label: 'E-mail:',
            controlType: 'TextField',
            type: 'text',
            required: true,
            value: '', // 'john.smith@gmail.com',
            error: false,
            helperText: '',
            okText: '',
            normalize: (val) => { return val.trim() },
            validate: (val) => { return val.length !== 0 },
            errorText: 'Shouldn\'t be empty'
        },
        {
            id: 'password',
            label: 'Password:',
            controlType: 'TextField',
            type: 'password',
            required: true,
            value: '', // '1234',
            error: false,
            helperText: '',
            okText: '',
            normalize: (val) => { return val.trim() },
            validate: (val) => { return val.length >= 4 },
            errorText: 'Should be at least 4 symbols'
        },
        {
            id: 'role',
            controlType: 'Radio',
            type: 'text',
            required: true,
            value: 'user',
            arrValues: ['admin', 'user'],
            error: false,
        }
    ]

    getFields = (idArr) => {
        return this.fields.filter(el => idArr.includes(el.id));
    }

}