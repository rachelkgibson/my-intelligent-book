/* Engineering Practicum IV Honors — custom JavaScript */

/* Copy button for prompt admonition code blocks */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".prompt pre code").forEach(function (block) {
    var btn = document.createElement("button");
    btn.textContent = "Copy";
    btn.className = "prompt-copy-btn";
    btn.addEventListener("click", function () {
      navigator.clipboard.writeText(block.innerText).then(function () {
        btn.textContent = "Copied!";
        setTimeout(function () { btn.textContent = "Copy"; }, 2000);
      });
    });
    block.parentElement.insertBefore(btn, block);
  });
});
