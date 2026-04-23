'use client'

interface Heading {
    id: string;
    text: string;
}

interface BlogSideBarProps {
    headings: Heading[];
}

const BlogSideBar = ({ headings }: BlogSideBarProps) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (!element) return;

        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    if (!headings || !headings.length) {
        return <p className="text-sm text-gray-500">No headings found.</p>;
    }

    return (
        <div className="flex flex-col gap-3 text-md text-[#263586]">
            {headings.map((heading) => (
                <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={(e) => handleClick(e, heading.id)}
                    className="hover:text-black transition-colors leading-tight"
                >
                    {heading.text}
                </a>
            ))}
        </div>
    )
}

export default BlogSideBar