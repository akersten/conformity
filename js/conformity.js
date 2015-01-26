function lint(text, minify, width) {
    minify = (typeof minify === "undefined") ? false : minify;
    if (minify) {
        return minify_impl(text, width);
    } else {
        return lint_impl(text, width);
    }
}

/**
 * Tokenize the text and generate words on a line until the width is satisfied,
 * then move on to the next line.
 *
 * @param text The text to minify
 * @param width How long each line should be
 */
function minify_impl(text, width) {
    width = (typeof width === "undefined") ? 1 : width;
    text = (typeof text === "undefined") ? "" : text;

    if (width < 1) {
        width = 1;
    }

    // Since we're not interested in the existing formatting, remove all line
    // breaks and treat them as spaces.
    text = text.replace(/\r\n/g, " ");
    text = text.replace(/\r/g, " ");
    text = text.replace(/\n/g, " ");

    var tokens = text.split(" ");
    var res = "";
    var curWidth = 0;

    tokens.map(function (token) {
        // See if we can add the word to this line by checking its length
        // against the current width. Don't forget to account for the extra
        // space.
        if ((curWidth + token.length + 1 <= width) || (curWidth == 0)) {
            // Acceptable to add.

            // Special case to kill space at the very beginning...
            if (curWidth === 0) {
                res += token;
                curWidth += token.length;
            } else {
                res += " " + token;
                curWidth += token.length + 1;
            }
        } else {
            // Couldn't add this word because it would push this line over the
            // limit. We _must_ add it to the next line, then. Start the line
            // width count at the width of that word. Note that this may result
            // in lines that are longer than the width if the token to be added
            // is, by itself, longer than the column limit. This is unavoidable
            // and necessary in order to fit all of the words - this token will
            // then be on the line by itself.

            // Need a newline before adding this word.
            curWidth = token.length;
            res += "\n" + token;
        }
    });

    return res;
}

/**
 * Crawl the text line by line, looking for lines that are longer than the width
 * and if one is found, flow its text into the next line, and continue flowing
 * any affected lines.
 *
 * This has the effect of limiting the column width without compressing things
 * like section headers.
 *
 * @param text The text to lint
 * @param width How long each line should be, at maximum
 */
function lint_impl(text, width) {
    width = (typeof width === "undefined") ? 1 : width;
    text = (typeof text === "undefined") ? "" : text;

    if (width < 1) {
        width = 1;
    }

    var lines = text.split("\n");
    var res = "";

    // The way the mapping will work is to generate new lines of output,
    // inserting new lines for overflow where need be.
    lines.map(function(line) {
        // Now, check the length of this line.
        if (line.length <= width) {
            // This line fits entirely.
            res += line;
        } else {
            // Ok, the line with overflow is too long (or even without overflow
            // it could just be too long), so split by words and try to get this
            // line below the width limit... Hey, we can re-use the minify
            // function here!
            res += minify_impl(line, width);
        }

        res += "\n"
    });

    // Trim the last added newline...
    res = res.substr(0, res.length - 1);
    return res;
}