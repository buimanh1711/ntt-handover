function toSlug(string) {
  return string.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

module.exports = toSlug;