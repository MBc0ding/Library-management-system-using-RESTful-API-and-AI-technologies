import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Member from '../models/member.js';
import Admin from '../models/Admin.js';  // Assuming you have an Admin model

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';  // You should use an environment variable for the secret key

// Sign up a new member
async function signup(req, res) {
    try {
        const { name, email, password, address, contact } = req.body;

        // Check if the email already exists in users
        const existingUser = await Member.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new member
        const newMember = new Member(null, name, email, hashedPassword, address, contact, null);
        const memberId = await Member.create(newMember);

        res.status(201).json({ message: 'Member created successfully', memberId });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Log in a user
async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Try to find the user in the members table
        let user = await Member.findByEmail(email);
        if (user) {
            // Compare the password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            
            const member_id = await Member.getMemberId(user.id);
            
          //  console.log("member_id : ",member_id);
            
            // Generate a JWT
            const token = jwt.sign({ id: member_id, email: user.email, role: 'member' }, JWT_SECRET, { expiresIn: '1h' });

            return res.json({ message: 'Login successful', token });
        }

        return res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Log in an admin
async function adminLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Try to find the user in the admins table
        let user = await Admin.findByEmail(email);
        if (user) {
            // Directly compare the plain text password
            if (password !== user.password) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // Generate a JWT
            const token = jwt.sign({ id: user.id, email: user.email, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });

            return res.json({ message: 'Login successful', token });
        }

        return res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export { signup, login, adminLogin };

