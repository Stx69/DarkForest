#ifdef GL_ES
precision highp float;
#endif

// glslsandbox uniforms
uniform float time;
uniform vec2 resolution;

vec3 outCol = vec3 (.0); 

void Corrupted_SunFractal (float t, vec2 FC, vec2 r, inout vec3 o)
{
    float g=1., e, s, k = t*.22;
    for(float i=0.; i < 15.;++i) {
        vec3 p = vec3(g*(FC.xy - .5*r)/r.y + .0,g - 1.);
	p.xz *= mat2(cos(k),sin(k),-sin(k),cos(k));
        s = 12.;
        for(int i=0; i < 2; ++i ) {
            s *= e = max(2.,(12.-1.*cos(k))/dot(p,p*3.));
            p = vec3(2,1,.9) - abs(abs(p)*e - vec3(1,1,1) );
        }
        g += min(length(p.xz), p.y)/s;
        o.rg += (s + .9, 10.3, s/5e4);
    }
}

void main(void)
{
    Corrupted_SunFractal(time+60., gl_FragCoord.xy, resolution.xy, outCol);
    gl_FragColor = vec4(outCol + gl_FragCoord.xyz/resolution.xyy*0.2, 2.)*vec4(0.0,1.8,0,1);
}