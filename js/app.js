const repoOwner = 'ikecha';
const repoName = '0930';
const issueNumber = 1; // コメントを管理するためのIssue番号
const token = 'your-personal-access-token';

const commentForm = document.getElementById('comment-form');
const commentContent = document.getElementById('comment-content');
const commentsContainer = document.getElementById('comments-container');

// コメントを送信する
commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = commentContent.value.trim();
    if (content) {
        await postComment(content);
        commentContent.value = '';
        loadComments();
    }
});

// コメントを取得する
async function loadComments() {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueNumber}/comments`, {
        headers: {
            'Authorization': `token ${token}`
        }
    });
    const comments = await response.json();
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        const commentElem = document.createElement('div');
        commentElem.className = 'comment';
        commentElem.textContent = comment.body;
        commentsContainer.appendChild(commentElem);
    });
}

// コメントを投稿する
async function postComment(content) {
    await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueNumber}/comments`, {
        method: 'POST',
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({ body: content })
    });
}

// 初期ロード
loadComments();

// 0.01秒ごとにコメントをリロードする
setInterval(loadComments, 10);
