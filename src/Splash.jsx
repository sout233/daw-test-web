import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Splash() {
    return (<>
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-4xl font-bold">测测哪款DAW</h1>
                    <h1 className="text-5xl font-bold">更适合你</h1>
                    <p className="py-2">仅供娱乐 仍在开发中</p>
                    <p className="py-2">dev. by sout_Nantang</p>
                    <Link className="btn btn-primary" to="/ex">开始测试</Link>
                </div>
            </div>
        </div>
    </>);
}

export default Splash;
