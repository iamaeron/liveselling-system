async function sendTestClaim(name: string, id: string, commentText: string) {
  const payload = {
    object: "page",
    entry: [
      {
        id: "110288305421565",
        time: Date.now(),
        changes: [
          {
            field: "feed",
            value: {
              item: "comment",
              verb: "add",
              comment_id: `comment_${Date.now()}_${Math.random()}`,
              post_id: "123456789_post_01",
              created_time: Math.floor(Date.now() / 1000),
              message: commentText,
              from: {
                id: `${id}_buyer_psid`,
                name: name,
              },
            },
          },
        ],
      },
    ],
  };

  console.log(`🚀 Sending test comment: "${commentText}"...`);

  const response = await fetch("http://localhost:3000/api/facebook/webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  console.log(`✅ Status: ${response.status} | Response: ${text}`);
}

// Run test cases
sendTestClaim("Senku Ishigami", "5438574385", "Mine 3AB 3x");
sendTestClaim("Senku Ishigami", "5438574385", "Mine 01A 4x");
sendTestClaim("Jane Patrick", "575834579", "Mine 5ZZ 7x");
sendTestClaim("Matt Murdock", "534657436", "Mine 10X x4");
