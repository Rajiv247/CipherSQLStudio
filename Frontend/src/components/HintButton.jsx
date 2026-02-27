 const HintButton = ({ onClick, loading }) => {
    return (
      <button
        className="hint-btn"
        onClick={onClick}
        disabled={loading}
      >
        {loading ? 'Getting hint...' : 'Get Hint'}
      </button>
    );
  }; 

  export default HintButton;