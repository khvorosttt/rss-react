interface SearchButtonProps {
    onClick: () => void;
}

export default function SearchButton({ onClick }: SearchButtonProps) {
    return (
        <button className="search-button" type="button" onClick={onClick}>
            Search
        </button>
    );
}
