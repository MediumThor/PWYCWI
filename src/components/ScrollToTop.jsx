function ScrollToTop() {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button onClick={handleClick} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            Scroll to top
        </button>
    );
}