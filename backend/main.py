import re
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
from PIL import Image
import io
import google.generativeai as genai2
from google import genai
import os
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes



# Configure Google Generative AI
genai2.configure(api_key="AIzaSyD66npWWEDp8zXmnI2X9FMPQwDQs6A4NIs")
model = genai2.GenerativeModel("gemini-2.0-flash")

client = genai.Client(api_key="AIzaSyD66npWWEDp8zXmnI2X9FMPQwDQs6A4NIs")
@app.route("/analyze", methods=["POST"])
def analyze_image():
    if "image" not in request.files:
        return jsonify({"error": "No image file uploaded"}), 400

    image_file = request.files["image"]
    image = Image.open(io.BytesIO(image_file.read()))

    try:
        response = model.generate_content([image, "write a code for the given image to replicate it as it is in ReactJs you can use tailwind too, dont give any extra text describing anything there should only be code "])
        generated_code = response.text.strip()

        # Remove markdown-style code blocks (```jsx and ```)
        clean_code = re.sub(r"```jsx|```", "", generated_code).strip()

        # Save to a separate file
        with open("C:/Users/himan/OneDrive/Desktop/v0-clone-it-now/src/components/ok.tsx", "w", encoding="utf-8") as f:
            f.write(clean_code)

        return jsonify({"description": clean_code})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/sketch", methods=["POST"])
def sketch():
    if "image" not in request.files:
        return jsonify({"error": "No image file uploaded"}), 400

    image_file = request.files["image"]
    image = Image.open(io.BytesIO(image_file.read()))

    try:
        response = model.generate_content([image, "Generate a ReactJS code that replicates the given sketch accurately. The sketch is roughly drawn everything written in red is annotation STRICTLY FOLLOW THAT RED THING DRAWN IN RED ISNT THE PART OF THE DESIGN dont consider it to be the design it is only there to help the structuring of the ui, so refine it while maintaining its structure. Use Tailwind CSS for styling. Provide only the code without any extra description"])
        generated_code = response.text.strip()

        # Remove markdown-style code blocks (```jsx and ```)
        clean_code = re.sub(r"```jsx|```", "", generated_code).strip()

        # Save to a separate file
        with open("C:/Users/himan/OneDrive/Desktop/v0-clone-it-now/src/components/Ok3.tsx", "w", encoding="utf-8") as f:
            f.write(clean_code)

        return jsonify({"description": clean_code})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/host", methods=["POST"])
def host_app():
    data = request.get_json()
    subdomain = data.get("subdomain")
    code = data.get("code")

    if not subdomain or not code:
        return jsonify({"error": "Subdomain and code are required"}), 400

    # Validate subdomain (alphanumeric and hyphens only)
    if not re.match(r"^[a-zA-Z0-9-]+$", subdomain):
        return jsonify({"error": "Invalid subdomain format"}), 400

    # Define hosting directory
    hosting_dir = os.path.join("C:/Users/himan/OneDrive/Desktop/v0-clone-it-now/public/hosted", subdomain)
    os.makedirs(hosting_dir, exist_ok=True)

    # Save the code to an index.html file
    file_path = os.path.join(hosting_dir, "index.html")
    try:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(code)
    except Exception as e:
        return jsonify({"error": f"Failed to save code: {str(e)}"}), 500

    # Return the hosted URL
    hosted_url = f"http://localhost:5000/hosted/{subdomain}/index.html"
    return jsonify({"message": "Hosted successfully!", "url": hosted_url})

@app.route("/header", methods=["POST"])
def header():
    print('i ran')
    if "text" not in request.json:
        return jsonify({"error": "Text input is required"}), 400

    prompt_text = request.json["text"]  # Get text input from the request
    print(prompt_text)
    try:
        prompt = f"""
        Replace everything with the context of {prompt_text}. Do not change placeholder images and rewrite the code from start to end with correct imports.
        I want to paste it in the React file directly, so do not give anything else. Strictly follow the format, and replace numbers with valid content and numbers
        according to {prompt_text} respectively, based on your understanding.

        ```jsx
        import React from 'react';

        export default function HeroSection() {{
            return (
                <div className="bg-white overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                            <svg
                                className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 transform translate-x-1/2"
                                fill="#ffffff"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <polygon points="50,0 100,0 50,100 0,100" />
                            </svg>
                            <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>
                            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                <div className="sm:text-center lg:text-left">
                                    <h1 className="text-4xl tracking-tight font-extrabold text-green-500 sm:text-5xl md:text-6xl">
                                        <span className="block xl:inline">Welcome to</span>{' '}
                                        <span className="block text-green-600 xl:inline">{prompt_text}</span>
                                    </h1>
                                    <p className="mt-3 text-base text-green-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                        Learn more about {prompt_text} and explore further!
                                    </p>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <div className="rounded-md shadow">
                                            <a
                                                href="#"
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                                            >
                                                Explore {prompt_text}
                                            </a>
                                        </div>
                                        <div className="mt-3 sm:mt-0 sm:ml-3">
                                            <a
                                                href="#"
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-{'gray-900' if 'dark' in prompt_text else 'gray-200'} hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                                            >
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <img
                            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                            src="https://via.placeholder.com/500"
                            alt="{prompt_text} illustration"
                        />
                    </div>
                </div>
            );
        }}
        ```

        Please ensure the text remains harmless and does not include any explicit content.
        """

        response = model.generate_content([prompt])  # Use dynamic prompt text
        generated_code = response.text.strip()

        # Remove markdown-style code blocks (```jsx and ```)
        clean_code = re.sub(r"```jsx|```", "", generated_code).strip()

        # Save to a separate file
        with open("D:/Varun/web/beproject/src/Head.jsx", "w", encoding="utf-8") as f:
            f.write(clean_code)

        return jsonify({"description": clean_code})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/pricing", methods=["POST"])
def pricing():
    if "text" not in request.json:
        return jsonify({"error": "Text input is required"}), 400

    prompt_text = request.json["text"]  # Get text input from the request

    try:
        # Corrected prompt string
        prompt = f"""replace everything with the context of {prompt_text} and rewrite the code from start to end with correct imports:

                      import {{FaCheck}} from "react-icons/fa"

                      const features = [
                        'Private forum access',
                        'Member resources',
                        'Entry to annual conference',
                        'Official member t-shirt'
                      ]

                      export default function Membership() {{
                        return (
                          <div className="bg-white py-24 sm:py-32">
                            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                              <div className="mx-auto max-w-2xl sm:text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Transparent Pricing</h2>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                  Clear and straightforward pricing to make your shopping experience hassle-free.
                                </p>
                              </div>
                              <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                                <div className="p-8 sm:p-10 lg:flex-auto">
                                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">Lifetime Membership</h3>
                                  <p className="mt-6 text-base leading-7 text-gray-600">
                                    Get access to exclusive benefits with a one-time payment.
                                  </p>
                                  <div className="mt-10 flex items-center gap-x-4">
                                    <h4 className="flex-none text-sm font-semibold leading-6 text-green-600">Included Features</h4>
                                    <div className="h-px flex-auto bg-gray-100" />
                                  </div>
                                  <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                                    {{features.map((feature) => (
                                      <li key={{feature}} className="flex gap-x-3">
                                        <FaCheck className="text-green-600" />
                                        {{feature}}
                                      </li>
                                    ))}}
                                  </ul>
                                </div>
                                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                                  <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                                    <div className="mx-auto max-w-xs px-8">
                                      <p className="text-base font-semibold text-gray-600">One-time Payment</p>
                                      <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                        <span className="text-5xl font-bold tracking-tight text-gray-900">$349</span>
                                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                                      </p>
                                      <a href="#" className="mt-10 block w-full rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                                        Get Membership
                                      </a>
                                      <p className="mt-6 text-xs leading-5 text-gray-600">
                                        Invoices and receipts available for easy company reimbursement
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }}

                      change the features & everything with the context of {prompt_text}
                      write just the full file code, nothing extra. Please keep the text harmless and non-explicit.
                   """

        response = model.generate_content([prompt])  # Use dynamic prompt text
        generated_code = response.text.strip()

        # Remove markdown-style code blocks
        clean_code = re.sub(r"```jsx|```", "", generated_code).strip()


        # Save to a separate file
        with open("D:/Varun/web/beproject/src/components/Pricing.jsx", "w", encoding="utf-8") as f:
            f.write(clean_code)

        return jsonify({"description": clean_code})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/feature", methods=["POST"])
def features():
    text = request.json.get("text")  # Use .get() to avoid KeyError
    if not text:
        return jsonify({"error": "Text input is required"}), 400

    prompt_text = f"""
    replace everything with the context of {text} and rewrite the code from start to end with correct imports:

    import {{ BsCloudArrowUp, BsLock, BsServer }} from 'react-icons/bs'

    export default function Example() {{
      const features = [
        {{
          name: 'Push to deploy.',
          description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
          icon: BsCloudArrowUp,
        }},
        {{
          name: 'SSL certificates.',
          description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
          icon: BsLock,
        }},
        {{
          name: 'Database backups.',
          description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
          icon: BsServer,
        }},
      ];

      return (
        <div className="overflow-hidden bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-green-600">Deploy faster</h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better workflow</p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                    {{features.map((feature) => (
                      <div key={{feature.name}} className="relative pl-9">
                        <dt className="inline font-semibold text-gray-900">
                          <feature.icon className="absolute left-1 top-1 h-5 w-5 text-green-600" aria-hidden="true" />
                          {{feature.name}}
                        </dt>
                        <dd className="inline">{{feature.description}}</dd>
                      </div>
                    ))}}
                  </dl>
                </div>
              </div>
              <img
                src="https://placeholder.com/600x350"
                alt="Product screenshot"
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                width={2432}
                height={1442}
              />
            </div>
          </div>
        </div>
      );
    }}

    replace everything with the context of {text} and rewrite the code from start to end.
    Write just the full file code, nothing extra. Please keep the text harmless and non-explicit.
    """

    try:
        response = model.generate_content([prompt_text])  # Use the dynamic prompt text
        generated_code = response.text.strip()

        # Remove markdown-style code blocks (```jsx and ```)
        clean_code = re.sub(r"```jsx|```", "", generated_code).strip()
        print(clean_code)
        with open("D:/Varun/web/beproject/src/components/Features.jsx", "w", encoding="utf-8") as f:
            f.write(clean_code)

        # Ensure directory exists

        return jsonify({"description": clean_code})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route("/action", methods=["POST"])
def action():
    if not request.is_json or "text" not in request.json:
        return jsonify({"error": "Text input is required"}), 400

    prompt_text = request.json["text"]

    try:
        prompt = f"""replace everything with the context of {prompt_text} and rewrite the code from start to end with correct imports, i want to paste it in the react file directly so do not give anything else strictly follow the format please and numbers with valid content and numbers according to {prompt_text} respectively of your understanding.

import React from "react";

export default function Example() {{
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl leading-6 text-gray-900">
              Approach
            </h3>
            <p className="mt-2 text-md text-gray-500">
              {{ text paragraph of 2-3 lines about the approach }}
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow-xl sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <dl>
                  <div className="bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-lg font-medium text-green-900">
                      Users on platform
                    </dt>
                    <dd className="mt-1 text-lg text-green-900 sm:mt-0 sm:col-span-2">
                      250k
                    </dd>
                  </div>
                  <div className="bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-lg font-medium text-green-900">
                      Revenue
                    </dt>
                    <dd className="mt-1 text-lg text-green-900 sm:mt-0 sm:col-span-2">
                      $8.9 billion
                    </dd>
                  </div>
                  <div className="bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-lg font-medium text-green-900">
                      Transactions this year
                    </dt>
                    <dd className="mt-1 text-lg text-green-900 sm:mt-0 sm:col-span-2">
                      401,093
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}}"""

        response = model.generate_content([prompt])
        generated_code = response.text.strip()

        # Remove markdown-style code blocks
        clean_code = re.sub(r"```jsx|```", "", generated_code).strip()

        # Ensure the directory exists
        with open("D:/Varun/web/beproject/src/components/Nav.jsx", "w", encoding="utf-8") as f:
            f.write(clean_code)

        return jsonify({"description": clean_code})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/plan", methods=["POST"])
def plan_website():
    data = request.get_json()
    prompt = data.get("prompt", "")

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    try:
        # Generate a plan for the website
        response = model.generate_content([
            f"Plan a website sections based on the following prompt: {prompt}. Break it into relevant sections it should have more than 5 sections , and provide a brief description for each section."
        ])
        plan = response.text.strip()

        return jsonify({"plan": plan})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


MODERN_PROMPT = '''
Generate a set of modern, sleek React components using Tailwind CSS. Follow these instructions exactly and override Tailwind's defaults with a custom palette based on {colors} NO COMMENTS FOR ANYTHING.

Design Principles:
1. Layout Architecture:
- Use fluid grid systems with Tailwind's grid/flex combined with negative space (gap-8+)
- Implement layered compositions with backdrop-blur overlays and subtle gradients
- Create visual flow using asymmetric spacing and container queries
- Apply "isolate" and "contain-paint" for performance optimization

2. Section Design:
- Alternate between full-bleed sections and contained layouts
- Use dynamic background treatments (subtle radial gradients, animated grain textures)
- Separate sections with SVG dividers or ::after pseudo-elements with gradient borders
- Implement scroll-linked opacity/transform effects for depth

3. Component Philosophy:
- Build around content-first layouts with smart whitespace
- Create visual hierarchy through typography scale (text-4xl→text-lg)
- Use motion-safe transitions (hover:scale-102 active:scale-98)
- Apply "group/item" patterns for interactive elements
- Implement modern loading states with skeleton UI

Specific Elements:
- No comments displaying the start of the component 
- use color for texts too 
- use tailwind grid for better arrangements
- the whole website should have a background color please ensure 
- The sections must be displayed nicely and should have a differentiable gap.
- Implement a fully responsive layout using Tailwind's responsive classes.
- Design Card components and data display sections with modern aesthetics, including "shadow-lg", subtle hover effects, and clean, well-defined borders.
- Use placeholder images from "https://placehold.co/300x200?text=Placeholder" (modify the size and text as needed per component).
- Replace default icons with meaningful SVG assets to enhance visual appeal and usability.
- Integrate smooth, animated transitions between sections for a polished experience.
- Employ advanced Tailwind classes like "bg-gradient-to-r", "backdrop-blur-lg", "space-y-6", "rounded-xl", and "shadow-sm" to achieve a beautiful, modern UI.
- Ensure data presentation is user-friendly with clear typography hierarchy, ample spacing, and layouts optimized for readability.

Website Plan:
{plan}

Output Requirements:
- Return ONLY the JSX code wrapped in <template>...</template> tags.
- Do not include inline comments or extra text within the JSX.
- Prioritize responsiveness, data-friendly layouts, custom color usage, and modern UI design with SVG assets throughout.
'''


@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    plan = data.get('plan', '')
    requirements = data.get('requirements', {})

    colors = ", ".join(requirements.get('colors', ['slate', 'emerald']))
    sections = ", ".join(requirements.get('components', []))
    styles = requirements.get('styles', 'modern minimalist')

    full_prompt = MODERN_PROMPT.format(
        plan=plan,
        colors=colors,
        sections=sections,
        styles=styles
    )

    try:
        response = model.generate_content(full_prompt)
        generated_code = response.text

        # Extract code from template tags
        start = generated_code.find('<template>') + 10
        end = generated_code.find('</template>')
        clean_code = generated_code[start:end].strip()
        print(clean_code)
        return jsonify({
            "html": clean_code,
            "prompt": full_prompt
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/modify", methods=["POST"])
def modify_website():
    data = request.get_json()
    existing_html = data.get("html", "")
    prompt = data.get("prompt", "")
    requirements = data.get("requirements", {})

    if not existing_html or not prompt:
        return jsonify({"error": "Both HTML and prompt are required"}), 400

    try:
        # Generate modifications based on existing HTML and new requirements
        response = model.generate_content([
            f"""Modify the following HTML code according to this prompt: {prompt}
            Keep the same structure and styling approach, but update the content and components as requested.
            Return only the modified HTML code, no explanations or markdown.
            
            Existing HTML:
            {existing_html}
            """
        ])
        
        generated_code = response.text.strip()
        # Remove markdown-style code blocks if present
        clean_code = re.sub(r"```(html|jsx)?|```", "", generated_code).strip()
        
        return jsonify({"html": clean_code})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/publish", methods=["POST"])
def publish_website():
    data = request.get_json()
    html = data.get("html")

    if not html:
        return jsonify({"error": "HTML content is required"}), 400

    # Generate a unique identifier for the website
    import uuid
    site_id = str(uuid.uuid4())[:8]
    
    # Create directory for the website
    site_dir = os.path.join("C:/Users/himan/OneDrive/Desktop/v0-clone-it-now/public/hosted", site_id)
    os.makedirs(site_dir, exist_ok=True)

    # Save the HTML content
    try:
        with open(os.path.join(site_dir, "index.html"), "w", encoding="utf-8") as f:
            f.write(html)
        
        # Return the dynamic URL
        url = f"http://localhost:5000/hosted/{site_id}/index.html"
        return jsonify({"url": url})
    except Exception as e:
        return jsonify({"error": f"Failed to publish website: {str(e)}"}), 500

# Initialize stats storage
STATS_DIR = "C:/Users/himan/OneDrive/Desktop/v0-clone-it-now/public/hosted/stats"
os.makedirs(STATS_DIR, exist_ok=True)

def get_site_stats(site_id):
    stats_file = os.path.join(STATS_DIR, f"{site_id}.json")
    if os.path.exists(stats_file):
        with open(stats_file, "r") as f:
            stats = json.load(f)
            # Convert the unique_visitors back to a list if it exists
            if "unique_visitors" in stats:
                stats["unique_visitors"] = list(set(stats["unique_visitors"]))
            return stats
    return {
        "views": 0,
        "unique_visitors": [],
        "page_views": {},
        "browsers": {},
        "devices": {},
        "countries": {},
        "referrers": {},
        "bounce_rate": 0,
        "avg_time": 0,
        "last_updated": datetime.now().isoformat()
    }

def update_site_stats(site_id, request):
    stats = get_site_stats(site_id)
    
    # Update basic metrics
    stats["views"] += 1
    
    # Track unique visitors using IP
    visitor_ip = request.remote_addr
    if visitor_ip not in stats["unique_visitors"]:
        stats["unique_visitors"].append(visitor_ip)
    
    # Update browser and device info
    user_agent = request.headers.get("User-Agent", "Unknown")
    browser = "Chrome" if "Chrome" in user_agent else "Firefox" if "Firefox" in user_agent else "Other"
    device = "Mobile" if "Mobile" in user_agent else "Desktop"
    
    stats["browsers"][browser] = stats["browsers"].get(browser, 0) + 1
    stats["devices"][device] = stats["devices"].get(device, 0) + 1
    
    # Update referrer
    referrer = request.headers.get("Referer", "direct")
    stats["referrers"][referrer] = stats["referrers"].get(referrer, 0) + 1
    
    # Save stats
    stats_file = os.path.join(STATS_DIR, f"{site_id}.json")
    with open(stats_file, "w") as f:
        # Convert set to list before serializing
        json.dump(stats, f)
    
    return stats

@app.route('/hosted/<site_id>/stats', methods=['GET'])
@cross_origin()
def get_stats(site_id):
    stats = get_site_stats(site_id)
    # Convert any sets to lists to ensure JSON serialization works
    if isinstance(stats.get('unique_visitors'), set):
        stats['unique_visitors'] = list(stats['unique_visitors'])
    # Convert any other potential sets in nested dictionaries
    for key, value in stats.items():
        if isinstance(value, dict):
            for subkey, subvalue in value.items():
                if isinstance(subvalue, set):
                    stats[key][subkey] = list(subvalue)
    return jsonify(stats)

@app.route("/hosted/<site_id>/track", methods=["POST"])
def track_stats(site_id):
    stats = update_site_stats(site_id, request)
    return jsonify({"success": True, "stats": stats})

# Modify the existing serve_hosted_file route to track stats
@app.route('/hosted/<path:filename>')
def serve_hosted_file(filename):
    # Extract site_id from the path
    site_id = filename.split('/')[0]
    
    # Update stats before serving the file
    update_site_stats(site_id, request)
    
    return send_from_directory('C:/Users/himan/OneDrive/Desktop/v0-clone-it-now/public/hosted', filename)

@app.route('/hosted-sites', methods=['GET'])
@cross_origin()
def get_hosted_sites():
    hosted_dir = "C:/Users/himan/OneDrive/Desktop/v0-clone-it-now/public/hosted"
    # Get all subdirectories in the hosted directory that have an index.html file
    sites = []
    try:
        for site_id in os.listdir(hosted_dir):
            if os.path.isdir(os.path.join(hosted_dir, site_id)) and site_id != 'stats':
                if os.path.exists(os.path.join(hosted_dir, site_id, 'index.html')):
                    sites.append(site_id)
        return jsonify(sites)
    except Exception as e:
        print(f"Error in get_hosted_sites: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
