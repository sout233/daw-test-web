import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Radar } from '@ant-design/charts';
import { useRef } from "react";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import ResultLink from "./ResultLink";


function FakeResultPage() {
    // 截图神术
    const captureRef = useRef();
    const buttonRef = useRef();

    const handleCaptureClick = () => {
        // 获取不想包含的元素
        const elementsToHide = document.querySelectorAll('.class2hide');

        function hideElements() {
            elementsToHide.forEach(el => el.style.display = 'none');
        }

        function showElements() {
            elementsToHide.forEach(el => el.style.display = '');
        }

        hideElements(); // 隐藏元素

        domtoimage.toBlob(captureRef.current)
            .then(blob => {
                saveAs(blob, 'screenshot.png');
                showElements(); // 截屏完成后显示元素
            })
            .catch(error => {
                console.error('oops, something went wrong!', error);
                showElements(); // 如果出错也显示元素
            });
    };


    // 该死的map

    const { data: paramsData } = useParams();

    return (
        <div ref={captureRef} className="max-w-4xl w-auto overscroll-x-none relative overflow-hidden flex flex-col items-center justify-center m-auto bg-base-100">
            <div className="flex flex-col justify-center">
                <div className="absolute translate-y-[30%]">
                    <div className="bg-primary pointer-events-none absolute start-20 aspect-square w-96 rounded-full opacity-20 blur-3xl"></div>
                    <div className="bg-success pointer-events-none absolute aspect-square w-full rounded-full opacity-10 blur-3xl"></div>
                    <img src="https://img.moegirl.org.cn/common/a/a3/栗子头.png" alt="logo" className="w-60 animate-ping rotate-6 rounded-2xl translate-x-[30%] translate-y-[50%] opacity-50" />
                </div>
                <div className="m-10">
                    <div className="flex flex-row justify-between">
                        <h1 className="md:text-2xl text-md font-bold text-base-content">测测哪款DAW更适合你</h1>
                        <h1 className="md:text-2xl text-md font-bold text-primary italic">测试结果</h1>
                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <h1 className="md:text-4xl text-3xl font-bold text-base-content">或许</h1>
                            <h1 className="md:text-4xl text-3xl font-bold text-base-content">你不适合编曲</h1>
                            <h1 className="text-xl font-bold text-base-content">建议把所有设备买了</h1>
                            <h1 className="text-xl font-bold text-base-content">请我吃一顿疯狂星期四</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="h-96"></div>


            <div>
                <h1 className="font-bold text-2xl">骗你的</h1>
                <h1 className="font-bold text-2xl">快去继续写曲子⑧</h1>
                <h1 className="font-bold text-2xl">just do it</h1>
            </div>

            <div className="h-40"></div>

            <ResultLink></ResultLink>
        </div>
    );
}

export default FakeResultPage;
