import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer style = {{height:"15vh"}}className="footer py-4 px-8 bg-blue-300">
    <div className="container mx-auto text-center text-gray-600">
        <p>&copy; 2024 Bus Management. All rights reserved.</p>
        <div className="mt-4">
            <a href="/about_us" className="text-blue-600 hover:text-blue-800 mr-4">Privacy Policy</a>
            <a href="/about_us" className="text-blue-600 hover:text-blue-800">Terms of Service</a>
        </div>
    </div>
</footer>
    </>
  );
}
