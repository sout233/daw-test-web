import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Radar } from '@ant-design/charts';
import { useRef } from "react";
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';


const data = [
    { name: '性能', star: 10371 },
    { name: '自由度', star: 7380 },
    { name: '自带资源', star: 7414 },
    { name: '性价比', star: 2140 },
    { name: '教学资源', star: 660 },
    { name: '界面美观', star: 885 },
];

function ResultPage() {
    const logos =
    {
        'FL Studio': '/FL Studio.png',
        'Reaper': '/REAPER.ico',
        'Ableton Live': '/Live.png',
        'Logic Pro': '/Logic.png',
        'Pro Tools': '/Pro Tools.png',
        'Cubase': '/Cubase.jpg',
        'Studio One': '/Studio One.png',
        'Cakewalk': '/Cakewalk.png',
        'LMMS': '/LMMS.svg',
        'Bitwig': 'https://assets.bitwig.net/static/web/img/BW_Logo_Header.svg?v=001'
    }


    // Chart init

    const config = {
        data: data.map((d) => ({ ...d, star: Math.sqrt(d.star) })),
        xField: 'name',
        yField: 'star',
        area: {
            style: {
                fillOpacity: 0.2,
            },
        },
        height: 400,
        width: 400,
        scale: {
            x: {
                padding: 0.5,
                align: 0,
            },
            y: {
                nice: true,
            },
        },
        axis: {
            x: {
                title: false,
                grid: true,
            },
            y: {
                gridAreaFill: 'rgba(0, 0, 0, 0.04)',
                label: false,
                title: false,
            },
        },
    };

    // 截图神术
    const captureRef = useRef();

    const handleCaptureClick = () => {
        domtoimage.toBlob(captureRef.current)
            .then(blob => {
                saveAs(blob, 'screenshot.png');
            });
    };


    // 该死的map

    const { data: paramsData } = useParams();

    let enData = window.atob(decodeURI(paramsData));
    console.log(enData);
    let json = JSON.parse(enData);

    // 将对象转换为数组
    let sortedEntries = Object.entries(json).sort((a, b) => {
        // 比较两个数组的第二个元素（即值）
        return b[1] - a[1];
    });

    // 将排序后的数组转换回对象
    let sortedDictionary = Object.fromEntries(sortedEntries);

    const keys = Object.keys(sortedDictionary);

    let values = Object.values(sortedDictionary);

    // 找到最值
    let maxValue = Math.max(...values);
    let minValue = Math.min(...values);

    let aimDaw = sortedEntries[0][0];
    // aimDaw = "Reaper";

    const listItems = keys.map((key) => {
        const percent = ((sortedDictionary[key] - minValue) / (maxValue - minValue) * 100).toFixed(2);
        const rating = parseInt((sortedDictionary[key] - minValue));

        return (<div className="w-72" key={aimDaw}>
            <div className="flex flex-row justify-between">
                <h3 className="text-md font-semibold">{key}</h3>
                <h3 className="text-md opacity-50">{percent}% ({rating})</h3>
            </div>
            <progress class="progress progress-primary" value={percent} max="100"></progress>
        </div>)
    });


    // 到此为止了

    let [recommend, setRecommend] = useState(null);

    // 启动吧，fetch之力！！！
    useEffect(() => {
        fetch('/recommend.json')
            .then(res => res.json())
            .then(data => setRecommend(data))
            .then(() => console.log(recommend))
            .catch(err => console.log(err));

    }, []);

    return (
        <div ref={captureRef} className="max-w-4xl w-screen overscroll-x-none relative overflow-hidden flex flex-col items-center justify-center m-auto bg-base-100">
            <div className="flex flex-col justify-center">
                <div className="absolute translate-y-[30%]">
                    <div className="bg-primary pointer-events-none absolute start-20 aspect-square w-96 rounded-full opacity-20 blur-3xl"></div>
                    <div className="bg-success pointer-events-none absolute aspect-square w-full rounded-full opacity-10 blur-3xl"></div>
                    <img src={logos[aimDaw]} alt="logo" className="w-60 rotate-6 rounded-2xl translate-x-[120%] translate-y-[10%] opacity-50" />
                </div>
                <div className="m-10">
                    <div className="flex flex-row justify-between">
                        <h1 className="md:text-2xl text-xl font-bold text-base-content">测测哪款DAW更适合你</h1>
                        <h1 className="md:text-2xl text-xl font-bold text-primary italic">测试结果</h1>
                    </div>
                    <div class="divider"></div>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <h1 className="md:text-4xl text-3xl font-bold text-base-content">或许</h1>
                            <h1 className="md:text-4xl text-3xl font-bold text-base-content"><span className="text-primary">{aimDaw}</span> 比较适合你？</h1>
                            <h1 className="text-xl font-bold text-base-content">其次是{sortedEntries[1][0]}和{sortedEntries[2][0]}</h1>
                            <h1 className="text-xl font-bold text-base-content">它们可能也是不错的选择</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center bg-base-100 rounded-xl p-4 m-4">
                {listItems}
            </div>

            <div className="h-20"></div>

            <div className="flex flex-col justify-between items-center">
                <h1 className="text-4xl font-bold text-base-content">{aimDaw}</h1>
                <h1 className="text-6xl font-bold text-primary italic absolute left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-20 text-nowrap">{recommend && recommend[aimDaw]['tag']}</h1>
                <p className="pt-5 text-lg p-10 font-bold text-base-content text-pretty break-before-auto whitespace-pre-line text-center">{recommend && recommend[aimDaw]['desc']}</p>
            </div>

            <div className="h-20"></div>

            <div className="items-center justify-center text-center">
                <h1 className="text-4xl font-bold text-base-content mb-10">?看看参数?</h1>
                <Radar {...config} ></Radar>
            </div>

            <div className="h-20"></div>

            <div className="flex flex-col justify-center items-center">
                <button className="btn btn-primary w-60" onClick={handleCaptureClick}>生成报告</button>
            </div>

            <div className="h-20"></div>

        </div>
    );
}

export default ResultPage;