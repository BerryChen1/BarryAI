import re

with open('src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the new grid items
new_grid = """              {/* Row 1 / Block 1-4 */}
          <div className="w-full h-full relative overflow-hidden group/vid bg-[#0A0A0A] cursor-pointer" onClick={() => openProjectById('brand-xuanye')}>
            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/6.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-105" autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/vid:opacity-100 transition-all duration-500 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
              <h3 className="text-white font-bold text-[10px] md:text-sm lg:text-base tracking-wider mb-2 transform translate-y-4 group-hover/vid:translate-y-0 transition-transform duration-500">《玄夜·引渡》</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 group-hover/vid:scale-100 transition-all duration-500 delay-75">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <CyberText lines={["FRAME", "BY", "FRAME."]} />

          <div className="w-full h-full relative overflow-hidden group/vid bg-[#0A0A0A] cursor-pointer" onClick={() => openProjectById('vid-14')}>
            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/1.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-105" autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/vid:opacity-100 transition-all duration-500 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
              <h3 className="text-white font-bold text-[10px] md:text-sm lg:text-base tracking-wider mb-2 transform translate-y-4 group-hover/vid:translate-y-0 transition-transform duration-500">《墨染·天下》</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 group-hover/vid:scale-100 transition-all duration-500 delay-75">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="w-full h-full relative overflow-hidden group/vid bg-[#0A0A0A] cursor-pointer" onClick={() => openProjectById('vid-1')}>
            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/3.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-105" autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/vid:opacity-100 transition-all duration-500 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
              <h3 className="text-white font-bold text-[10px] md:text-sm lg:text-base tracking-wider mb-2 transform translate-y-4 group-hover/vid:translate-y-0 transition-transform duration-500">《The Last》</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 group-hover/vid:scale-100 transition-all duration-500 delay-75">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Row 2 / Block 5-8 */}
          <div className="w-full h-full relative overflow-hidden group/vid bg-[#0A0A0A] cursor-pointer" onClick={() => openProjectById('oth-2')}>
            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/4.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-105" autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/vid:opacity-100 transition-all duration-500 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
              <h3 className="text-white font-bold text-[10px] md:text-sm lg:text-base tracking-wider mb-2 transform translate-y-4 group-hover/vid:translate-y-0 transition-transform duration-500">怪奇研究所</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 group-hover/vid:scale-100 transition-all duration-500 delay-75">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="w-full h-full relative overflow-hidden group/vid bg-[#0A0A0A] cursor-pointer" onClick={() => openProjectById('vid-13')}>
            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/2.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-105" autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/vid:opacity-100 transition-all duration-500 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
              <h3 className="text-white font-bold text-[10px] md:text-sm lg:text-base tracking-wider mb-2 transform translate-y-4 group-hover/vid:translate-y-0 transition-transform duration-500">《超时空决战！英灵殿》</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 group-hover/vid:scale-100 transition-all duration-500 delay-75">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="w-full h-full relative overflow-hidden group/vid bg-[#0A0A0A] cursor-pointer" onClick={() => openProjectById('comm-3')}>
            <video src="https://pub-0ffb6a41279f413d9d362b7df1b92573.r2.dev/new%20shoye/5.mp4" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/vid:scale-105" autoPlay loop muted playsInline />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/vid:opacity-100 transition-all duration-500 flex flex-col items-center justify-center pointer-events-none p-4 text-center">
              <h3 className="text-white font-bold text-[10px] md:text-sm lg:text-base tracking-wider mb-2 transform translate-y-4 group-hover/vid:translate-y-0 transition-transform duration-500">《五音傩神》</h3>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 group-hover/vid:scale-100 transition-all duration-500 delay-75">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <CyberText lines={["READY", "WHEN", "YOU ARE."]} noWrapLast={true} />"""

start_pattern = "              {/* Row 1 / Block 1-4 */}"
end_pattern = "          <CyberText lines={[\"READY\", \"WHEN\", \"YOU ARE.\"]} noWrapLast={true} />"

start_idx = content.find(start_pattern)
end_idx = content.find(end_pattern) + len(end_pattern)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + new_grid + content[end_idx:]
    with open('src/App.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Replaced successfully")
else:
    print("Could not find patterns")

