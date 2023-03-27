const handleSubmit = async () => {
    try {
        const title = document.querySelector("#new-post-title").value.trim();
        const content = document.querySelector("#new-post-content").value.trim();
        await fetch("/api/blog", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        alert("There was a problem submitting!");
    }
};

document.querySelector("#new-post-form").addEventListener("submit", handleSubmit);