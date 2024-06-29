function QnA() {
    return (
        <>
            <div className="flex flex-col p-10 items-center justify-center">
                <ul>
                    <li>
                        <h1 className="text-2xl font-bold mb-4">题目准确吗？</h1>
                        <p className="text-lg mb-8">基本上都是依靠主观以及刻板印象出的题，所以不准确。</p>
                    </li>
                    <li>
                        <h1 className="text-2xl font-bold mb-4">为什么有碧蓝档案？</h1>
                        <p className="text-lg mb-8">我想不出题目了，随便写的（）</p>
                    </li>
                    <li>
                        <h1 className="text-2xl font-bold mb-4">我可以添加题目吗？</h1>
                        <p className="text-lg mb-8">可以，你可以向<a className="underline text-primary" href="https://github.com/sout233/daw-test-web">该项目的储存库</a>提交PR来修改题目。</p>
                    </li>
                    <li>
                        <h1 className="text-2xl font-bold mb-4">你和王一鸣什么关系？</h1>
                        <p className="text-lg mb-8">铁暗恋。</p>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default QnA;