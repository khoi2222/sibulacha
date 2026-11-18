// ============ VALENTINE 3D - 6 KỊCH BẢN LIA MÁY TỰ ĐỘNG ============
window.onload = function() {
    console.log('Valentine 3D - Đang khởi tạo...');
    console.log('CHẾ ĐỘ QUAY VIDEO - LIA MÁY TỰ ĐỘNG 6 KỊCH BẢN');
    
    // ============ 1. CẤU HÌNH CƠ BẢN ============
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03030a);
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(6, 2, 18);
    camera.lookAt(0, 0, 0);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.4;
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // ============ 2. CONTROLS - TẮT ĐỂ CAMERA TỰ CHẠY ============
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.enableTilt = false;
    
    // ============ 3. ÁNH SÁNG ============
    const ambientLight = new THREE.AmbientLight(0x606090);
    scene.add(ambientLight);
    
    const topLight = new THREE.PointLight(0xffeedd, 1.3, 50);
    topLight.position.set(0, 8, 10);
    scene.add(topLight);
    
    const bottomLight = new THREE.PointLight(0xccaa88, 0.9, 40);
    bottomLight.position.set(0, -8, 5);
    scene.add(bottomLight);
    
    const leftLight = new THREE.PointLight(0xaaddff, 1.1, 45);
    leftLight.position.set(-8, 4, 8);
    scene.add(leftLight);
    
    const rightLight = new THREE.PointLight(0xffaadd, 1.1, 45);
    rightLight.position.set(8, 4, 8);
    scene.add(rightLight);
    
    const frontLight = new THREE.PointLight(0xffffcc, 1.4, 50);
    frontLight.position.set(0, 2, 15);
    scene.add(frontLight);
    
    const backLight = new THREE.PointLight(0xccddff, 0.7, 50);
    backLight.position.set(0, 0, -15);
    scene.add(backLight);
    
    // ============ 4. SAO NỀN ============
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = [];
    for (let i = 0; i < 2500; i++) {
        starPositions.push((Math.random() - 0.5) * 600);
        starPositions.push((Math.random() - 0.5) * 600);
        starPositions.push((Math.random() - 0.5) * 600 - 200);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ 
        color: 0xaaccff, 
        size: 0.16, 
        transparent: true, 
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true 
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // ============ 5. VÀNH ĐAI TRẮNG ============
    const ringGeometry = new THREE.BufferGeometry();
    const ringPositions = [];
    for (let i = 0; i < 4000; i++) {
        const radius = 4.5 + Math.random() * 5;
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 0.4;
        ringPositions.push(Math.cos(angle) * radius);
        ringPositions.push(y);
        ringPositions.push(Math.sin(angle) * radius);
    }
    ringGeometry.setAttribute('position', new THREE.Float32BufferAttribute(ringPositions, 3));
    
    const ringCanvas = document.createElement('canvas');
    ringCanvas.width = 48;
    ringCanvas.height = 48;
    const ringCtx = ringCanvas.getContext('2d');
    ringCtx.beginPath();
    ringCtx.arc(24, 24, 16, 0, Math.PI * 2);
    ringCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ringCtx.fill();
    
    const ringMaterial = new THREE.PointsMaterial({
        map: new THREE.CanvasTexture(ringCanvas),
        color: 0xffffff,
        size: 0.16,
        transparent: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        opacity: 0.7
    });
    const ringParticles = new THREE.Points(ringGeometry, ringMaterial);
    scene.add(ringParticles);
    
    // Vành đai phụ
    const ringGeometry2 = new THREE.BufferGeometry();
    const ringPositions2 = [];
    for (let i = 0; i < 2000; i++) {
        const radius = 5.5 + Math.random() * 3.5;
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * 0.5;
        ringPositions2.push(Math.cos(angle) * radius);
        ringPositions2.push(y + Math.sin(angle) * 0.2);
        ringPositions2.push(Math.sin(angle) * radius * 0.9);
    }
    ringGeometry2.setAttribute('position', new THREE.Float32BufferAttribute(ringPositions2, 3));
    
    const ringMaterial2 = new THREE.PointsMaterial({
        color: 0x88aaff,
        size: 0.12,
        transparent: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        opacity: 0.4
    });
    const ringParticles2 = new THREE.Points(ringGeometry2, ringMaterial2);
    scene.add(ringParticles2);
    
    // ============ 6. LOAD 20 ẢNH ============
    console.log('🖼️ BẮT ĐẦU LOAD 20 ẢNH...');
    
    const photoTextures = [];
    let loadedCount = 0;
    
    function createDefaultTexture(index) {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        
        const hue = (index * 18) % 360;
        const gradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 512);
        gradient.addColorStop(0, `hsl(${hue}, 100%, 75%)`);
        gradient.addColorStop(0.7, `hsl(${hue + 40}, 90%, 65%)`);
        gradient.addColorStop(1, `hsl(${hue + 80}, 80%, 55%)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1024, 1024);
        
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'black';
        ctx.shadowBlur = 15;
        ctx.font = 'bold 300px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(index, 512, 512);
        
        return new THREE.CanvasTexture(canvas);
    }
    
    for (let i = 1; i <= 20; i++) {
        const img = new Image();
        img.src = `pic/${i}.jpg?t=${Date.now() + i}`;
        
        img.onload = function() {
            loadedCount++;
            console.log(`✅ Đã load: pic/${i}.jpg (${loadedCount}/20)`);
            
            const canvas = document.createElement('canvas');
            canvas.width = 1024;
            canvas.height = 1024;
            const ctx = canvas.getContext('2d');
            
            ctx.drawImage(img, 0, 0, 1024, 1024);
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 4;
            ctx.strokeRect(4, 4, 1016, 1016);
            
            const texture = new THREE.CanvasTexture(canvas);
            texture.anisotropy = 16;
            photoTextures[i-1] = texture;
            
            if (loadedCount === 20) {
                console.log('🎯 ĐÃ LOAD ĐỦ 20 ẢNH!');
                createSphereAndPapers();
                startCameraScript(); // BẮT ĐẦU KỊCH BẢN LIA MÁY
            }
        };
        
        img.onerror = function() {
            loadedCount++;
            photoTextures[i-1] = createDefaultTexture(i);
            if (loadedCount === 20) {
                console.log('🎯 ĐÃ CÓ 20 ẢNH (mặc định)!');
                createSphereAndPapers();
                startCameraScript();
            }
        };
    }
    
    // ============ 7. BIẾN TOÀN CỤC ============
    let sphereGroup, flyingPapers;
    let messageData = null;
    let scriptTime = 0;
    let currentScript = 0;
    
    // ============ 8. LOAD MESSAGES.JSON ============
    function loadMessages() {
        fetch('messages.json')
            .then(response => response.json())
            .then(data => {
                console.log('📝 Đã load messages.json với', data.floatingTexts.length, 'dòng chữ!');
                messageData = data;
                if (photoTextures.length === 20) {
                    createFloatingTexts();
                }
            })
            .catch(error => {
                messageData = {
                    floatingTexts: [
                        { content: "Anh yêu em! ❤️", color: "#ff3366", size: 1.2, speed: 0.3 },
                        { content: "Em là cả thế giới 🌍", color: "#33ccff", size: 1.1, speed: 0.4 },
                        { content: "Mãi bên nhau em nhé 💑", color: "#ff9900", size: 1.0, speed: 0.35 }
                    ],
                    valentineMessage: {
                        title: "💖 CHÚC MỪNG VALENTINE 💖",
                        message: "Cảm ơn em đã đến bên anh!",
                        from: "Người yêu của em ❤️"
                    }
                };
                if (photoTextures.length === 20) {
                    createFloatingTexts();
                }
            });
    }
    
    loadMessages();
    
    // ============ 9. TẠO HÌNH CẦU 20 ẢNH ============
    function createSphereAndPapers() {
        sphereGroup = new THREE.Group();
        
        for (let i = 0; i < 20; i++) {
            const phi = Math.acos(1 - 2 * (i + 0.5) / 20);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            
            const x = Math.sin(phi) * Math.cos(theta);
            const y = Math.sin(phi) * Math.sin(theta);
            const z = Math.cos(phi);
            
            const size = 1.0;
            const geometry = new THREE.PlaneGeometry(size, size);
            const material = new THREE.MeshStandardMaterial({
                map: photoTextures[i],
                side: THREE.DoubleSide,
                emissive: 0x332211,
                emissiveIntensity: 0.15,
                roughness: 0.3,
                metalness: 0.1,
                transparent: false
            });
            
            const photo = new THREE.Mesh(geometry, material);
            photo.position.set(x * 2.2, y * 2.2, z * 2.2);
            photo.lookAt(x * 3, y * 3, z * 3);
            
            sphereGroup.add(photo);
        }
        
        sphereGroup.position.y = 0.2;
        scene.add(sphereGroup);
        console.log('✅ Đã tạo hình cầu 20 ảnh!');
        
        // Tạo 30 ảnh bay
        flyingPapers = [];
        for (let i = 0; i < 30; i++) {
            const tex = photoTextures[i % 20];
            const w = 0.9 + Math.random() * 0.7;
            const h = 0.9 + Math.random() * 0.7;
            
            const geometry = new THREE.PlaneGeometry(w, h);
            const material = new THREE.MeshStandardMaterial({
                map: tex,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.9,
                emissive: 0x331122,
                emissiveIntensity: 0.1,
                roughness: 0.4
            });
            
            const paper = new THREE.Mesh(geometry, material);
            
            const radius = 8 + Math.random() * 7;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 14;
            
            paper.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
            paper.rotation.set(
                (Math.random() - 0.5) * 1.5,
                Math.random() * Math.PI * 2,
                (Math.random() - 0.5) * 1.3
            );
            
            paper.userData = {
                radius, angle, height,
                speed: 0.00025 + Math.random() * 0.00035,
                floatSpeed: 0.0004 + Math.random() * 0.0004,
                rotX: (Math.random() - 0.5) * 0.004,
                rotY: (Math.random() - 0.5) * 0.004,
                rotZ: (Math.random() - 0.5) * 0.003,
                floatOffset: Math.random() * Math.PI * 2
            };
            
            scene.add(paper);
            flyingPapers.push(paper);
        }
        
        console.log('✅ Đã tạo 30 ảnh bay!');
        
        if (messageData) createFloatingTexts();
        createMeteors();
    }
    
    // ============ 10. TẠO DÒNG CHỮ - 3 QUỸ ĐẠO ============
    function createFloatingTexts() {
        if (!messageData || !messageData.floatingTexts) return;
        if (window.textSprites) window.textSprites.forEach(s => scene.remove(s));
        
        const textSprites = [];
        const texts = messageData.floatingTexts;
        
        texts.forEach((txt, index) => {
            const canvas = document.createElement('canvas');
            canvas.width = 1024;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            
            ctx.font = `bold ${txt.size * 45}px 'Courier New', monospace`;
            ctx.fillStyle = txt.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.shadowBlur = 15;
            ctx.fillText(txt.content, 512, 128);
            ctx.shadowBlur = 0;
            ctx.strokeStyle = 'rgba(255,255,255,0.4)';
            ctx.lineWidth = 2;
            ctx.strokeText(txt.content, 512, 128);
            
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.SpriteMaterial({ 
                map: texture, transparent: true, blending: THREE.AdditiveBlending
            });
            const sprite = new THREE.Sprite(material);
            
            // 3 QUỸ ĐẠO RIÊNG
            if (index % 3 === 0) {
                const radius = 10;
                const angle = (index * 0.5) % (Math.PI * 2);
                sprite.position.set(Math.cos(angle) * radius, 0.5, Math.sin(angle) * radius);
                sprite.userData = { type: 'circle', radius, angle, speed: txt.speed * 0.1, y: 0.5 };
            } else if (index % 3 === 1) {
                const radiusX = 11, radiusZ = 7;
                const angle = (index * 0.7) % (Math.PI * 2);
                sprite.position.set(Math.cos(angle) * radiusX, Math.sin(angle * 0.5) * 3, Math.sin(angle) * radiusZ);
                sprite.userData = { type: 'ellipse', radiusX, radiusZ, angle, speed: txt.speed * 0.12 };
            } else {
                const radius = 9;
                const angle = (index * 0.6) % (Math.PI * 2);
                sprite.position.set(
                    Math.cos(angle) * radius,
                    Math.sin(angle) * 2,
                    Math.sin(angle * 2) * radius * 0.6
                );
                sprite.userData = { type: 'figure8', radius, angle, speed: txt.speed * 0.15 };
            }
            
            sprite.scale.set(Math.min(4.5, 3.0 + txt.content.length * 0.03), 1.0, 1);
            scene.add(sprite);
            textSprites.push(sprite);
        });
        
        window.textSprites = textSprites;
        console.log(`✅ Đã tạo ${texts.length} dòng chữ!`);
    }
    
    // ============ 11. TẠO SAO BĂNG ============
    function createMeteors() {
        window.meteors = [];
        function createMeteor() {
            const geom = new THREE.ConeGeometry(0.12, 0.7, 6);
            const mat = new THREE.MeshBasicMaterial({ color: 0xaaddff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
            const meteor = new THREE.Mesh(geom, mat);
            const radius = 45;
            const angle = Math.random() * Math.PI * 2;
            meteor.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 30, Math.sin(angle) * radius);
            meteor.rotation.z = Math.atan2(-meteor.position.x, -meteor.position.z);
            meteor.rotation.x = Math.PI / 4;
            meteor.userData = { speed: 0.16 + Math.random() * 0.1, dir: new THREE.Vector3(-meteor.position.x * 0.01, -meteor.position.y * 0.005, -meteor.position.z * 0.01).normalize() };
            scene.add(meteor);
            window.meteors.push(meteor);
        }
        for (let i = 0; i < 12; i++) createMeteor();
    }
    
    // ============ 12. 6 KỊCH BẢN LIA MÁY TỰ ĐỘNG ============
    function startCameraScript() {
        console.log('🎬 BẮT ĐẦU KỊCH BẢN LIA MÁY - 6 CẢNH QUAY 5 GIÂY');
        scriptTime = 0;
        currentScript = 0;
        
        // HIỂN THỊ HƯỚNG DẪN
        showCameraGuide();
    }
    
    function updateCameraScript(time) {
        if (!sphereGroup) return;
        
        const t = time * 0.001; // chuyển ms -> giây
        const sceneDuration = 5; // mỗi cảnh 5 giây
        const totalScenes = 6;

        const sceneIndex = Math.floor(t / sceneDuration) % totalScenes;
        const sceneProgress = (t % sceneDuration) / sceneDuration; // 0 -> 1
        switch(sceneIndex) {
            case 0: 
                camera.position.x = 0.8 + Math.sin(sceneProgress * Math.PI) * 0.6;
                camera.position.y = 0.3 + sceneProgress * 0.8;
                camera.position.z = 2.5 - sceneProgress * 0.5;
                camera.lookAt(0.2, 0.3 + sceneProgress * 0.2, 0);
                controls.target.set(0.2, 0.3 + sceneProgress * 0.2, 0);
                break;
                
            case 1:
                const angle2 = sceneProgress * Math.PI * 2;
                camera.position.x = Math.sin(angle2) * 2.2;
                camera.position.y = 0.8 + Math.sin(angle2 * 2) * 0.3;
                camera.position.z = 2.8 + Math.cos(angle2) * 1.2;
                camera.lookAt(0, 0.3, 0);
                controls.target.set(0, 0.3, 0);
                break;
                
            case 2: 
                camera.position.x = -1.0 + sceneProgress * 2.0;
                camera.position.y = -0.8 + sceneProgress * 1.2;
                camera.position.z = 2.8 - sceneProgress * 0.5;
                camera.lookAt(0, 0.2 + sceneProgress * 0.4, 0);
                controls.target.set(0, 0.2 + sceneProgress * 0.4, 0);
                break;
                
            case 3: 
                const angle4 = sceneProgress * Math.PI * 2;
                camera.position.x = Math.sin(angle4) * 2.5;
                camera.position.y = 2.8 - Math.cos(angle4 * 0.5) * 0.5;
                camera.position.z = 2.2 + Math.cos(angle4) * 1.5;
                camera.lookAt(0, 0.2, 0);
                controls.target.set(0, 0.2, 0);
                break;
                
            case 4:  Math.sin(sceneProgress * Math.PI) * 1.5;
                camera.position.y = 0.8 + Math.cos(sceneProgress * Math.PI * 2) * 0.3;
                camera.position.z = 5.0 + sceneProgress * 1.5;
                camera.lookAt(0, 0.2, 0);
                controls.target.set(0, 0.2, 0);
                break;
                
            case 5:
                const angle6 = sceneProgress * Math.PI * 1.5;
                camera.position.x = Math.sin(angle6) * 2.8;
                camera.position.y = 0.5 + Math.sin(angle6 * 1.5) * 0.4;
                camera.position.z = 3.8 + Math.cos(angle6) * 1.2;
                camera.lookAt(0, 0.3, 0.2);
                controls.target.set(0, 0.3, 0.2);
                break;
        }
    }
    
    // ============ 13. HIỂN THỊ HƯỚNG DẪN ============
    function showCameraGuide() {
        const guideDiv = document.createElement('div');
        guideDiv.style.position = 'fixed';
        guideDiv.style.top = '30px';
        guideDiv.style.left = '30px';
        guideDiv.style.background = 'rgba(0,0,0,0.85)';
        guideDiv.style.color = 'white';
        guideDiv.style.padding = '25px';
        guideDiv.style.borderRadius = '15px';
        guideDiv.style.zIndex = '1000';
        guideDiv.style.fontFamily = 'Arial';
        guideDiv.style.borderLeft = '5px solid #ff44aa';
        guideDiv.style.boxShadow = '0 0 30px rgba(255,68,170,0.3)';
        guideDiv.style.backdropFilter = 'blur(5px)';
        guideDiv.style.maxWidth = '500px';
        
        guideDiv.innerHTML = `
            <div style="font-size: 24px; color: #ff44aa; margin-bottom: 15px;">🎬 6 KỊCH BẢN LIA MÁY TỰ ĐỘNG</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
                <div style="background: rgba(255,68,170,0.15); padding: 10px; border-radius: 8px;">
                    <span style="color: #ff88aa; font-weight: bold;">01</span>
                    <span style="margin-left: 10px;">MACRO - Lướt bề mặt</span>
                </div>
                <div style="background: rgba(68,170,255,0.15); padding: 10px; border-radius: 8px;">
                    <span style="color: #88aaff; font-weight: bold;">02</span>
                    <span style="margin-left: 10px;">RIM LIGHTING - Viền sáng</span>
                </div>
                <div style="background: rgba(255,68,170,0.15); padding: 10px; border-radius: 8px;">
                    <span style="color: #ff88aa; font-weight: bold;">03</span>
                    <span style="margin-left: 10px;">LOW ANGLE - Góc thấp</span>
                </div>
                <div style="background: rgba(68,170,255,0.15); padding: 10px; border-radius: 8px;">
                    <span style="color: #88aaff; font-weight: bold;">04</span>
                    <span style="margin-left: 10px;">TOP DOWN - Trên cao</span>
                </div>
                <div style="background: rgba(255,68,170,0.15); padding: 10px; border-radius: 8px;">
                    <span style="color: #ff88aa; font-weight: bold;">05</span>
                    <span style="margin-left: 10px;">WIDE - Toàn cảnh</span>
                </div>
                <div style="background: rgba(68,170,255,0.15); padding: 10px; border-radius: 8px;">
                    <span style="color: #88aaff; font-weight: bold;">06</span>
                    <span style="margin-left: 10px;">CINEMATIC - Quay chậm</span>
                </div>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; border: 1px solid #ff44aa;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #88aaff;">⏱️ MỖI CẢNH 5 GIÂY - LẶP LẠI VÔ HẠN</span>
                    <span style="background: #ff44aa; padding: 5px 15px; border-radius: 20px; font-weight: bold;">LIVE</span>
                </div>
                <div style="margin-top: 12px; display: flex; justify-content: space-between; color: #fff;">
                    <span>🎥 OBS: BẮT ĐẦU QUAY NGAY</span>
                    <span>🖥️ F11: TOÀN MÀN HÌNH</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(guideDiv);
        
        // TỰ ĐỘNG ẨN SAU 20 GIÂY
        setTimeout(() => {
            guideDiv.style.transition = 'opacity 1s';
            guideDiv.style.opacity = '0';
            setTimeout(() => guideDiv.remove(), 1000);
        }, 20000);
    }
    
    // ============ 14. RESIZE ============
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // ============ 15. ANIMATION ============
    function animate() {
        requestAnimationFrame(animate);
        
        const time = Date.now();
        const t = time * 0.0005;
        
        // CẬP NHẬT KỊCH BẢN CAMERA
        if (sphereGroup) {
            updateCameraScript(time);
        }
        
        // Xoay hình cầu nhẹ
        if (sphereGroup) {
            sphereGroup.rotation.y += 0.0002;
            sphereGroup.rotation.x = Math.sin(t * 0.06) * 0.01;
        }
        
        // Xoay vành đai
        ringParticles.rotation.y += 0.0002;
        ringParticles2.rotation.y -= 0.00015;
        
        // Ảnh bay
        if (flyingPapers) {
            flyingPapers.forEach(paper => {
                paper.position.x = Math.cos(paper.userData.angle + t * paper.userData.speed) * paper.userData.radius;
                paper.position.z = Math.sin(paper.userData.angle + t * paper.userData.speed) * paper.userData.radius;
                paper.position.y = paper.userData.height + Math.sin(t * paper.userData.floatSpeed + paper.userData.floatOffset) * 1.0;
                paper.rotation.x += paper.userData.rotX;
                paper.rotation.y += paper.userData.rotY;
                paper.rotation.z += paper.userData.rotZ;
            });
        }
        
        // Dòng chữ
        if (window.textSprites) {
            window.textSprites.forEach((text) => {
                if (text.userData.type === 'circle') {
                    text.position.x = Math.cos(text.userData.angle + t * text.userData.speed) * text.userData.radius;
                    text.position.z = Math.sin(text.userData.angle + t * text.userData.speed) * text.userData.radius;
                } else if (text.userData.type === 'ellipse') {
                    text.position.x = Math.cos(text.userData.angle + t * text.userData.speed) * text.userData.radiusX;
                    text.position.z = Math.sin(text.userData.angle + t * text.userData.speed) * text.userData.radiusZ;
                    text.position.y = Math.sin((text.userData.angle + t * text.userData.speed) * 0.5) * 3;
                } else if (text.userData.type === 'figure8') {
                    const angle = text.userData.angle + t * text.userData.speed;
                    text.position.x = Math.cos(angle) * text.userData.radius;
                    text.position.z = Math.sin(angle * 2) * text.userData.radius * 0.6;
                    text.position.y = Math.sin(angle) * 2;
                }
            });
        }
        
        // Sao băng
        if (window.meteors) {
            window.meteors.forEach((meteor, index) => {
                meteor.position.x += meteor.userData.dir.x * meteor.userData.speed;
                meteor.position.y += meteor.userData.dir.y * meteor.userData.speed;
                meteor.position.z += meteor.userData.dir.z * meteor.userData.speed;
                if (Math.abs(meteor.position.x) > 80) {
                    scene.remove(meteor);
                    window.meteors.splice(index, 1);
                    if (window.meteors.length < 12) window.createMeteor?.();
                }
            });
        }
        
        stars.rotation.y += 0.00005;
        controls.update();
        renderer.render(scene, camera);
    }
    
    window.createMeteor = function() {
        const geom = new THREE.ConeGeometry(0.12, 0.7, 6);
        const mat = new THREE.MeshBasicMaterial({ color: 0xaaddff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
        const meteor = new THREE.Mesh(geom, mat);
        const radius = 45;
        const angle = Math.random() * Math.PI * 2;
        meteor.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 30, Math.sin(angle) * radius);
        meteor.rotation.z = Math.atan2(-meteor.position.x, -meteor.position.z);
        meteor.rotation.x = Math.PI / 4;
        meteor.userData = { speed: 0.16 + Math.random() * 0.1, dir: new THREE.Vector3(-meteor.position.x * 0.01, -meteor.position.y * 0.005, -meteor.position.z * 0.01).normalize() };
        scene.add(meteor);
        window.meteors.push(meteor);
        return meteor;
    };
    
    animate();
    console.log('✅ Khởi tạo hoàn tất! 6 KỊCH BẢN LIA MÁY ĐÃ SẴN SÀNG!');
};