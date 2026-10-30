function UserList({ users, onDelete }) {
    return (
        <div>

            <h2>Users</h2>

            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                users.map((user) => (
                    <div key={user._id}>

                        <h3>{user.name}</h3>

                        <p>Email: {user.email}</p>

                        <p>Age: {user.age}</p>

                        <button
                            onClick={() => onDelete(user._id)}
                        >
                            Delete
                        </button>

                        <hr />

                    </div>
                ))
            )}

        </div>
    );
}

export default UserList;