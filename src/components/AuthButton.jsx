export default function AuthButton({ title, loading, type }) {
    return (
        <button
            type={type}
            className="bg-green-700 font-bold hover:bg-green-800 disabled:bg-green-800 rounded-md text-white p-3"
            disabled={loading}
        >
            {loading ? (
                <div className="flex items-center justify-center">
                    <span className="loading loading-spinner loading-md bg-white"></span>
                </div>
            ) : (
                title
            )}
        </button>
    );
}
