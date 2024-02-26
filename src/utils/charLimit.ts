function charLimit(text: string) {
    if (text.length > 90) {
        return text.substring(0, 90) + " ...";
    } else {
        return text;
    }
}

export { charLimit }