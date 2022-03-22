import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Duc Minh',
        email: 'voducminh140201@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Minh Duc',
        email: 'minhduc@minhduc.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
]

export default users