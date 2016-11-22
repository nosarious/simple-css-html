// Natspir with Fogerty's voronoi


#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

vec2 hash(vec2 p)
{
    mat2 m = mat2(  13.85, 47.77,
                    99.41, 88.48
                );

    return fract(sin(m*p) * 46738.29);
}

float voronoi(vec2 p)
{
    vec2 g = floor(p);
    vec2 f = fract(p);

    float distanceToClosestFeaturePoint = 1.0;
    for(int y = -1; y <= 1; y++)
    {
        for(int x = -1; x <= 1; x++)
        {
            vec2 latticePoint = vec2(x, y);
            float currentDistance = distance(latticePoint + hash(g+latticePoint), f);
        //currentDistance+=sin(currentDistance*5.5+time);
            distanceToClosestFeaturePoint = min(distanceToClosestFeaturePoint, currentDistance);
        }
    }

    return distanceToClosestFeaturePoint;
}

void main( void )
{
    vec2 uv = ( gl_FragCoord.xy / resolution.xy ) * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    
    float r = voronoi( uv*2.0) * 5.50;
    float xWaves = smoothstep(0.1,1.0,sin(uv.x*2.0+time)*2.0);
    float yWaves = smoothstep(0.1,1.0,sin(uv.x*3.0+time*2.0)*2.0);
    float f = fract(uv.x*1.0+time);
    float t =voronoi( uv*8.0+time) * 1.50;
    vec3 c = sin(clamp(r*t/f*3.1415,0.0,20.0))*vec3(0.5,1.0,01.85);
    vec3 c1 = sin(1.0-clamp(r*1.25*3.1415,4.0,14.0))*xWaves*vec3(0.85,1.0,01.85);
    vec3 c2 = sin(1.0-clamp(r*1.25*3.1415,4.0,10.0))*yWaves*vec3(0.0,0.8,01.05);
    
        vec3 finalColor = vec3(c);
    gl_FragColor = vec4(finalColor, 0.25 );
}